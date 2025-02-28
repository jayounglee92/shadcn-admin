import { createLazyFileRoute } from '@tanstack/react-router'
import Test from '@/features/test'

export const Route = createLazyFileRoute('/_authenticated/test/')({
  component: Test,
})
