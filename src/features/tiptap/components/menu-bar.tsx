import { BubbleMenu, useCurrentEditor } from '@tiptap/react'
import { Quote, Minus, Palette, Highlighter, Link } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AlignDropdownMenu } from './align-dropdown-menu'
import MarksMenu from './marks-meun'
import MenuBarDivider from './menu-bar-divider'
import { NodesDropdownMenu } from './nodes-dropdown-menu'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className='inline-flex h-full flex-row items-center gap-0.5 rounded-lg border border-neutral-200 bg-white p-1 leading-none text-black shadow-sm dark:border-neutral-800 dark:bg-black'>
            <NodesDropdownMenu editor={editor} />
            <MenuBarDivider />
            <MarksMenu editor={editor} />
            <MenuBarDivider />
            <AlignDropdownMenu editor={editor} />
            <MenuBarDivider />
            <Button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'is-active' : ''}
              variant='ghost'
            >
              <Quote size={34} />
            </Button>
            <Button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              variant='ghost'
            >
              <Minus size={34} />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive('highlight') ? 'is-active' : ''}
              variant='ghost'
            >
              <Highlighter size={34} />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleLink().run()}
              className={editor.isActive('link') ? 'is-active' : ''}
              variant='ghost'
            >
              <Link size={34} />
            </Button>
            <Button
              onClick={() => editor.chain().focus().setTextStyle().run()}
              className={editor.isActive('textStyle') ? 'is-active' : ''}
              variant='ghost'
            >
              <Palette size={34} />
              {/* react-colorful__saturation */}
            </Button>
          </div>
        </BubbleMenu>
      )}
    </>
  )
}

export default MenuBar
