import { createLazyFileRoute } from '@tanstack/react-router'
import Tiptap from '@/features/tiptap'

export const Route = createLazyFileRoute('/_authenticated/tiptap/')({
  component: Tiptap,
})
