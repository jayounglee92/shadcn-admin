import { Editor } from '@tiptap/react'
import { Bold, Italic, Strikethrough, Underline } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MarksMenu = ({ editor }: { editor: Editor }) => {
  return (
    <>
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        variant='ghost'
      >
        <Bold size={34} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
        variant='ghost'
      >
        <Italic size={34} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
        variant='ghost'
      >
        <Underline size={34} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
        variant='ghost'
      >
        <Strikethrough size={34} />
      </Button>
    </>
  )
}

export default MarksMenu
