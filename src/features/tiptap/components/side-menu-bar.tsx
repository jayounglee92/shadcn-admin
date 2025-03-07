import { FloatingMenu, useCurrentEditor } from '@tiptap/react'
import { Image } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SideMenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className='inline-flex h-full flex-row items-center gap-0.5 rounded-lg border border-neutral-200 bg-white p-1 leading-none text-black shadow-sm dark:border-neutral-800 dark:bg-black'>
        <Button
          onClick={() => {
            editor
              .chain()
              .focus()
              .insertContent(`<div class="image-node-component" ></div>`)
              .run()
          }}
          className={editor.isActive('strike') ? 'is-active' : ''}
          variant='ghost'
        >
          <Image size={34} />
        </Button>
      </div>
    </FloatingMenu>
  )
}

export default SideMenuBar
