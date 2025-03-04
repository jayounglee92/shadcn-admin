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
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Pilcrow,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

type TList = {
  type: 'bulletList' | 'orderedList'
  icon: React.ReactNode
  text: string
  category: 'List'
}

type THeading = {
  type: 'heading'
  icon: React.ReactNode
  text: string
  level: 1 | 2 | 3 | 4 | 5 | 6
  category: 'Hierarchy'
}

type TParagraph = {
  type: 'paragraph'
  icon: React.ReactNode
  text: string
  category: 'Hierarchy'
}

type TNode = TList | THeading | TParagraph

const NODE_MAP: TNode[] = [
  {
    type: 'paragraph',
    icon: <Pilcrow size={34} />,
    text: 'Paragraph',
    category: 'Hierarchy',
  },
  {
    type: 'heading',
    level: 1,
    icon: <Heading1 size={34} />,
    text: 'Heading 1',
    category: 'Hierarchy',
  },
  {
    type: 'heading',
    level: 2,
    icon: <Heading2 size={34} />,
    text: 'Heading 2',
    category: 'Hierarchy',
  },
  {
    type: 'heading',
    level: 3,
    icon: <Heading3 size={34} />,
    text: 'Heading 3',
    category: 'Hierarchy',
  },
  {
    type: 'heading',
    level: 4,
    icon: <Heading4 size={34} />,
    text: 'Heading 4',
    category: 'Hierarchy',
  },
  {
    type: 'heading',
    level: 5,
    icon: <Heading5 size={34} />,
    text: 'Heading 5',
    category: 'Hierarchy',
  },
  {
    type: 'heading',
    level: 6,
    icon: <Heading6 size={34} />,
    text: 'Heading 6',
    category: 'Hierarchy',
  },
  { type: 'bulletList', icon: <List />, text: 'Bullet List', category: 'List' },
  {
    type: 'orderedList',
    icon: <ListOrdered size={34} />,
    text: 'Numbered List',
    category: 'List',
  },
]

export function NodesDropdownMenu({ editor }: { editor: Editor }) {
  if (!editor) {
    return null
  }

  const activeIcon = NODE_MAP.find(({ type, category, ...rest }) => {
    if (category === 'List') {
      return editor.isActive(type)
    }
    if (type === 'paragraph') {
      return editor.isActive(type)
    }
    if (type === 'heading' && 'level' in rest) {
      return editor.isActive(type, { level: rest.level })
    }
  })?.icon

  function toggleNode({
    editor,
    type,
    level,
  }: {
    editor: Editor
    type: string
    level?: THeading['level']
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
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost'>
          {activeIcon} <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col rounded-lg border border-neutral-200 bg-white px-2 py-4 shadow-sm dark:border-neutral-800 dark:bg-black'>
        {['Hierarchy', 'List'].map((category) => (
          <div key={category} className='mt-2 flex flex-col gap-1 first:mt-0'>
            <div className='mb-1 px-1.5 text-[.65rem] font-semibold uppercase text-neutral-500 dark:text-neutral-400'>
              {category}
            </div>
            {NODE_MAP.filter((node) => node.category === category).map(
              ({ type, icon, text, ...rest }) => (
                <Button
                  key={text}
                  onClick={() =>
                    toggleNode({
                      editor,
                      type,
                      ...('level' in rest ? { level: rest.level } : {}),
                    })
                  }
                  isActive={
                    type === 'heading' && 'level' in rest
                      ? editor.isActive(type, { level: rest.level })
                      : editor.isActive(type)
                  }
                  variant='ghost'
                  className='w-full justify-start'
                >
                  {icon}
                  <span>{text}</span>
                </Button>
              )
            )}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
