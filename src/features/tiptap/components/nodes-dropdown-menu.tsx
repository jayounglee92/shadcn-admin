import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { Editor } from '@tiptap/react'
import {
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Pilcrow,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NodesDropdownMenu({ editor }: { editor: Editor }) {
  if (!editor) {
    return null
  }

  function toggleNode({
    editor,
    type,
    level,
  }: {
    editor: Editor
    type: 'paragraph' | 'heading' | 'bulletList' | 'orderedList'
    level?: 1 | 2 | 3
  }) {
    if (type === 'heading' && level) {
      return editor.chain().focus().toggleHeading({ level }).run()
    }

    if (type === 'paragraph') {
      return editor.chain().focus().setParagraph().run()
    }

    return editor.chain().focus().toggleList(type, 'listItem').run()
  }

  return (
    <>
      <div className='flex gap-1'>
        <Button
          onClick={() => toggleNode({ editor, type: 'paragraph' })}
          isActive={editor.isActive('paragraph')}
          variant='ghost'
          className='w-full justify-start'
        >
          <Pilcrow size={34} />
        </Button>
        <Button
          onClick={() => toggleNode({ editor, type: 'heading', level: 1 })}
          isActive={editor.isActive('heading', { level: 1 })}
          variant='ghost'
          className='w-full justify-start'
        >
          <Heading1 size={34} />
        </Button>
        <Button
          onClick={() => toggleNode({ editor, type: 'heading', level: 2 })}
          isActive={editor.isActive('heading', { level: 2 })}
          variant='ghost'
          className='w-full justify-start'
        >
          <Heading2 size={34} />
        </Button>
        <Button
          onClick={() => toggleNode({ editor, type: 'heading', level: 3 })}
          isActive={editor.isActive('heading', { level: 3 })}
          variant='ghost'
          className='w-full justify-start'
        >
          <Heading3 size={34} />
        </Button>
        <Button
          onClick={() => toggleNode({ editor, type: 'bulletList' })}
          isActive={editor.isActive('bulletList')}
          variant='ghost'
          className='w-full justify-start'
        >
          <List />
        </Button>
        <Button
          onClick={() => toggleNode({ editor, type: 'orderedList' })}
          isActive={editor.isActive('orderedList')}
          variant='ghost'
          className='w-full justify-start'
        >
          <ListOrdered size={34} />
        </Button>
      </div>
    </>
  )
}
