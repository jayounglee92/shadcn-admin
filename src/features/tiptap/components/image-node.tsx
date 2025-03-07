import { useState, useRef, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import supabase from '@/server/supabase'
import { Node } from '@tiptap/core'
import { NodeViewWrapper, useCurrentEditor } from '@tiptap/react'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Image, LoaderCircle } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: 'Please upload a file',
    })
    .refine(
      (files) =>
        ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
          files?.[0]?.type
        ),
      'Please upload an image file (jpeg, png, gif, webp).'
    ),
})

const ImageNodeComponent = () => {
  const { editor } = useCurrentEditor()
  const [isLoading, setIsLoading] = useState(false) // 로딩 상태 추가
  const fileInputRef = useRef<HTMLInputElement | null>(null) // useRef를 조건문 밖으로 이동

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { file: undefined },
  })
  const fileRef = form.register('file')

  useEffect(() => {
    if (fileInputRef.current) {
      fileRef.ref(fileInputRef.current)
    }
  }, [fileRef])

  if (!editor) {
    return null
  }

  const handleFiles = async (files: FileList | null) => {
    // 파일 크기 확인

    const fileList = files
    if (fileList) {
      const filesArray = Array.from(fileList)
      filesArray.forEach((file) => {
        const maxFileSize = 200 * 1024 // 200KB

        if (file.size > maxFileSize) {
          window.alert(
            '파일 크기가 200KB를 초과합니다. 다른 파일을 선택해 주세요.'
          )
          if (fileInputRef.current) {
            fileInputRef.current.value = '' // 파일 입력 필드 초기화
          }
          return
        }
        handleAddImages(file)
      })
    }
  }

  const handleAddImages = async (file: File) => {
    setIsLoading(true) // 로딩 시작
    try {
      const imageFileName = uuidv4()

      // 업로드
      const { data, error } = await supabase.storage
        .from('image')
        .upload(`rich-text/${imageFileName}`, file)

      if (error) {
        console.log('파일이 업로드 되지 않습니다.', error)
        window.alert('파일이 업로드 되지 않습니다. 다시 시도하여 주십시오.')
        return
      }

      // 다운로드 url
      const res = await supabase.storage.from('image').getPublicUrl(data.path)

      editor
        .chain()
        .focus()
        .insertContent(`<div class="image-node-component"></div>`)

      editor
        .chain()
        .focus()
        .insertContent(
          `<img src="${res.data.publicUrl}" alt="uploaded image"/>`
        )
        .run()
    } catch (error) {
      window.alert('알 수 없는 문제가 발생하였습니다. 다시 시도하여 주십시오.')
      console.error(
        '알 수 없는 문제가 발생하였습니다. 다시 시도하여 주십시오.',
        error
      )
    } finally {
      setIsLoading(false) // 로딩 종료
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    handleFiles(files)
  }

  return (
    <NodeViewWrapper
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className='image-node cursor-pointer rounded-sm border-2 border-dashed hover:border-slate-300'
    >
      <div className='m-0 p-0' data-drag-handle='true'>
        <div
          className='flex flex-col items-center justify-center rounded-lg bg-opacity-80 px-8 py-10'
          contentEditable='false'
        >
          {isLoading ? (
            <LoaderCircle className='m-auto animate-spin' size={32} />
          ) : (
            <>
              <Image size={50} className='text-neutral-300' />
              <div className='flex flex-col items-center justify-center gap-2'>
                <div className='text-center text-sm font-medium text-neutral-400 dark:text-neutral-500'>
                  Drag and drop or
                </div>
                <div>
                  <Form {...form}>
                    <form id='image-upload-form' className='cursor-pointer'>
                      <FormField
                        control={form.control}
                        name='file'
                        render={() => (
                          <FormItem className='mb-2 space-y-1'>
                            <FormLabel className='hidden'>File</FormLabel>
                            <FormControl>
                              <Input
                                type='file'
                                {...fileRef}
                                className='h-8'
                                onChange={(e) => handleFiles(e.target.files)}
                                accept='.jpg,.jpeg,.png,.webp,.gif'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export const ImageNode = Node.create({
  name: 'imageUpload',
  group: 'block',
  parseHTML() {
    return [
      {
        tag: 'div[class="image-node-component"]',
      },
    ]
  },

  renderHTML() {
    return ['div', { class: 'image-node-component' }, 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeComponent)
  },
})
