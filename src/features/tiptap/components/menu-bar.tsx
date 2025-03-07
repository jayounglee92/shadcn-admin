import { useCallback } from 'react'
import { useCurrentEditor } from '@tiptap/react'
import { Highlighter, Link, Image } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AlignDropdownMenu } from './align-dropdown-menu'
import { LinkDropdown } from './link-dropdown'
import MarksMenu from './marks-meun'
import MenuBarDivider from './menu-bar-divider'
import { NodesDropdownMenu } from './nodes-dropdown-menu'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className='left-60 top-16 inline-flex h-fit flex-row items-center gap-0.5 rounded-lg border border-neutral-200 bg-white p-1 leading-none text-black dark:border-neutral-800 dark:bg-black'>
      <NodesDropdownMenu editor={editor} />
      <MenuBarDivider />
      <MarksMenu editor={editor} />
      <MenuBarDivider />
      <AlignDropdownMenu editor={editor} />
      <MenuBarDivider />
      {/* <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
        variant='ghost'
      >
        <Quote size={34} />
      </Button> */}
      {/* <Button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        variant='ghost'
      >
        <Minus size={34} />
      </Button> */}
      <Button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive('highlight') ? 'is-active' : ''}
        variant='ghost'
      >
        <Highlighter size={34} />
      </Button>
      <LinkDropdown editor={editor} />
      <Button
        onClick={() => {
          editor
            .chain()
            .focus()
            .insertContent(`<div class="image-node-component"></div>`)
            .run()
        }}
        className={editor.isActive('textStyle') ? 'is-active' : ''}
        variant='ghost'
      >
        <Image size={34} />
      </Button>
      {/* react-colorful__saturation */}
    </div>
  )
}

export default MenuBar
