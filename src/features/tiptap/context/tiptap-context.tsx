import React from 'react'
import useDialogState from '@/hooks/use-dialog-state'

type ImageUploadDialogType = 'create' | 'update' | 'delete' | 'import'

interface TipTapContextType {
  open: ImageUploadDialogType | null
  setOpen: (str: ImageUploadDialogType | null) => void
}

const TiptapContext = React.createContext<TipTapContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function TiptapProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<ImageUploadDialogType>(null)
  return <TiptapContext value={{ open, setOpen }}>{children}</TiptapContext>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTipTap = () => {
  const tiptapContext = React.useContext(TiptapContext)

  if (!tiptapContext) {
    throw new Error('useTipTap has to be used within <TiptapContext>')
  }

  return tiptapContext
}
