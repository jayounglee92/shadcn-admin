import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import RichTextEditor from './components/tiptap'
import { TipTapDialogs } from './components/tiptap-dialogs'
import TasksProvider from './context/tiptap-context'

const Tiptap = () => {
  return (
    <TasksProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mt-24'>
          <div className='mb-2 flex flex-wrap items-end justify-between gap-x-4 space-y-2'>
            <Input placeholder='제목' className='h-8 w-[150px] lg:w-[250px]' />
          </div>
          <div className='-mx-4 mt-2 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <RichTextEditor />
          </div>
        </div>
      </Main>
      <TipTapDialogs />
    </TasksProvider>
  )
}

export default Tiptap
