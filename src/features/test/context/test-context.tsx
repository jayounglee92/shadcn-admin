import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Test } from '../data/schema'

type TestDialogType = 'create' | 'update' | 'delete' | 'import'

interface TestContextType {
  open: TestDialogType | null
  setOpen: (str: TestDialogType | null) => void
  currentRow: Test | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Test | null>>
}

const TestContext = React.createContext<TestContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function TestProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<TestDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Test | null>(null)
  return (
    <TestContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </TestContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTest = () => {
  const testContext = React.useContext(TestContext)

  if (!testContext) {
    throw new Error('useTest has to be used within <TestContext>')
  }

  return testContext
}
