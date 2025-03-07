import { useTipTap } from '../context/tiptap-context'
import { ImageUploadDialog } from './image-upload-dialog'

export function TipTapDialogs() {
  const { open, setOpen } = useTipTap()
  return (
    <>
      <ImageUploadDialog
        key='image-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />
    </>
  )
}
