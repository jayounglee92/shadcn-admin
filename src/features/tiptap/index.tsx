import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import RichTextEditor from './components/tiptap'

const Tiptap = () => {
  return (
    <div>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-2 flex flex-wrap items-end justify-between gap-x-4 space-y-2'>
          <h2 className='mb-4 text-2xl font-bold tracking-tight'>글쓰기</h2>
        </div>
        <div className='-mx-4 mt-2 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <RichTextEditor />
        </div>
      </Main>
    </div>
  )
}

export default Tiptap
