import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import supabase from '@/server/supabase'
import { useCurrentEditor } from '@tiptap/react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImageUploadDialog({ open, onOpenChange }: Props) {
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const { editor } = useCurrentEditor()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { file: undefined },
  })

  const fileRef = form.register('file')

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (fileList) {
      const filesArray = Array.from(fileList)
      filesArray.forEach((file) => {
        handleAddImages(file)
      })
    }
  }

  const handleAddImages = async (file: File) => {
    try {
      const newFileName = uuidv4()
      const { data, error } = await supabase.storage
        .from('image')
        .upload(`rich-text/${newFileName}`, file)

      if (error) {
        console.log('파일이 업로드 되지 않습니다.', error)
        return
      }
      const res = supabase.storage.from('image').getPublicUrl(data.path)
      setFiles((prevFiles) => [file, ...prevFiles])
      setUploadedFileUrl((prev: string[]) => [...prev, res.data.publicUrl])
    } catch (error) {
      console.error(
        '알 수 없는 문제가 발생하였습니다. 다시 시도하여 주십시오.',
        error
      )
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val)
        form.reset()
      }}
    >
      <DialogContent className='gap-2 sm:max-w-sm'>
        <DialogHeader className='text-left'>
          <DialogTitle>Image Upload</DialogTitle>
          <DialogDescription>Image Upload quickly.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id='image-upload-form'>
            <FormField
              control={form.control}
              name='file'
              render={() => (
                <FormItem className='mb-2 space-y-1'>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      {...fileRef}
                      className='h-8'
                      onChange={handleFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          {uploadedFileUrl.map((img: string, i: number) => (
            <div key={i}>
              <img src={img} alt={`${img}-${i}`} />
            </div>
          ))}
        </Form>
        <DialogFooter className='gap-2 sm:gap-0'>
          <DialogClose asChild>
            <Button variant='outline'>Close</Button>
          </DialogClose>
          <Button
            type='button'
            form='image-upload-form'
            onClick={() => {
              setFiles([])
              setUploadedFileUrl([])
              onOpenChange(false)

              if (editor)
                editor
                  .chain()
                  .focus()
                  .setImage({
                    src: 'https://plzohirzkwmwaqosdrzo.supabase.co/storage/v1/object/public/image/rich-text/55da0972-2dbc-43ab-a6de-e56723fa726f',
                  })
                  .selectParentNode()
                  .setLink({
                    href: 'https://plzohirzkwmwaqosdrzo.supabase.co/storage/v1/object/public/image/rich-text/55da0972-2dbc-43ab-a6de-e56723fa726f',
                  })
                  .run()
            }}
          >
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
