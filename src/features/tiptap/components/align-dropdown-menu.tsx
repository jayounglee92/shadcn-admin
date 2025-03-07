import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { Editor } from '@tiptap/react'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ChevronDown,
} from 'lucide-react'
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
  const activeIcon = ALIGN_MAP.find(({ type }) =>
    editor.isActive({ textAlign: type })
  )?.icon

  return (
    // <Popover>
    //   <PopoverTrigger asChild>
    //     <Button variant='ghost'>
    //       {activeIcon} <ChevronDown />
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent className='flex flex-col rounded-lg border border-neutral-200 bg-white px-2 py-4 shadow-sm dark:border-neutral-800 dark:bg-black'>
    <div>
      {ALIGN_MAP.map(({ icon, type, text }) => (
        <Button
          key={type}
          onClick={() => editor.chain().focus().setTextAlign(type).run()}
          isActive={editor.isActive({ textAlign: type })}
          variant='ghost'
          // className='w-full justify-start'
        >
          {icon}
        </Button>
      ))}
    </div>
    //   </PopoverContent>
    // </Popover>
  )
}
