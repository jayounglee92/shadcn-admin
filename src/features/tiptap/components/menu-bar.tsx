import { useRef } from 'react'
import { useCurrentEditor } from '@tiptap/react'
import { Highlighter, Image, PaletteIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AlignDropdownMenu } from './align-dropdown-menu'
import { LinkDropdown } from './link-dropdown'
import MarksMenu from './marks-meun'
import MenuBarDivider from './menu-bar-divider'
import { NodesDropdownMenu } from './nodes-dropdown-menu'

const MenuBar = () => {
  const { editor } = useCurrentEditor()
  const colorInputRef = useRef<HTMLInputElement>(null)
  const highlighterInputRef = useRef<HTMLInputElement>(null)

  if (!editor) {
    return null
  }
  console.log(editor)
  return (
    <div className='left-60 top-16 inline-flex h-fit flex-row items-center gap-0.5 rounded-lg border border-neutral-200 bg-white p-1 leading-none text-black dark:border-neutral-800 dark:bg-black'>
      <NodesDropdownMenu editor={editor} />
      <MenuBarDivider />
      <MarksMenu editor={editor} />
      <MenuBarDivider />
      <AlignDropdownMenu editor={editor} />
      <MenuBarDivider />
      <span className='relative'>
        <input
          type='color'
          ref={colorInputRef}
          onInput={(e) => {
            const target = e.target as HTMLInputElement
            editor.chain().focus().setColor(target.value).run()
          }}
          value={editor.getAttributes('textStyle').color}
          data-testid='setColor'
          className='h-9 w-8 opacity-0'
        />
        <Button
          variant='ghost'
          className='absolute left-0'
          onClick={() => colorInputRef.current?.click()}
        >
          <PaletteIcon />
        </Button>
      </span>
      <span className='relative'>
        <input
          type='color'
          ref={highlighterInputRef}
          onInput={(e) => {
            const target = e.target as HTMLInputElement
            console.log(target.value)
            editor.chain().focus().setHighlight({ color: target.value }).run()
          }}
          value={editor.getAttributes('highlight').color}
          data-testid='setHighlight'
          className='h-9 w-8 opacity-0'
        />
        <Button
          variant='ghost'
          className='absolute left-0'
          onClick={() => colorInputRef.current?.click()}
        >
          <Highlighter size={34} />
        </Button>
      </span>

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
    </div>
  )
}

export default MenuBar
