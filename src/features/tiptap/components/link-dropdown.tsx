import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { Editor } from '@tiptap/react'
import { Link } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function LinkDropdown({ editor }: { editor: Editor }) {
  const [url, setUrl] = useState('')

  const setLink = () => {
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url, target: '_blank' })
      .run()
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost'>
          <Link />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-4 shadow-sm dark:border-neutral-800 dark:bg-black'>
        <Input
          type='text'
          placeholder='Enter URL'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={setLink} className='mb-2'>
          Set Link
        </Button>
      </PopoverContent>
    </Popover>
  )
}
