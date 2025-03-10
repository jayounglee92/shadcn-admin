import { Editor } from '@tiptap/react'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ALIGN_MAP = [
  {
    type: 'left',
    icon: <AlignLeft />,
    text: 'Left',
  },
  {
    type: 'center',
    icon: <AlignCenter />,
    text: 'Center',
  },
  {
    type: 'right',
    icon: <AlignRight />,
    text: 'Right',
  },
  {
    type: 'justify',
    icon: <AlignJustify />,
    text: 'Justify',
  },
]

export function AlignDropdownMenu({ editor }: { editor: Editor }) {
  return (
    <>
      {ALIGN_MAP.map(({ icon, type }) => (
        <Button
          key={type}
          onClick={() => editor.chain().focus().setTextAlign(type).run()}
          isActive={editor.isActive({ textAlign: type })}
          variant='ghost'
        >
          {icon}
        </Button>
      ))}
    </>
  )
}
