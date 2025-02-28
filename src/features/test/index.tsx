import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePagination } from '@/hooks/use-pagination'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useSearch } from '@/features/test/hooks/use-search'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { TestDialogs } from './components/test-dialogs'
import { TestPrimaryButtons } from './components/test-primary-buttons'
import TestProvider from './context/test-context'
import { Fruit } from './types'

const searchFormSchema = z.object({
  searchTerm: z.string().min(1, { message: 'Search term is required.' }),
})

type SearchFormValues = z.infer<typeof searchFormSchema>

const Test = () => {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: { searchTerm: '' },
    mode: 'onChange',
  })

  const { pagination, onPaginationChange } = usePagination({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading, refetch } = useSearch(
    form.watch('searchTerm'),
    pagination.pageIndex,
    pagination.pageSize
  )

  const [tableData, setTableData] = useState(data?.data ?? [])

  const onSubmit = () => {
    refetch()
  }

  const handleSuccess = (updatedItem: Fruit) => {
    setTableData((prevData) =>
      prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    )
  }

  useEffect(() => {
    if (data?.data) {
      setTableData(data.data)
    }
  }, [data])

  return (
    <TestProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-2 flex flex-wrap items-end justify-between gap-x-4 space-y-2'>
          <div>
            <h2 className='mb-4 text-2xl font-bold tracking-tight'>
              콘텐츠 : 텍스트
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex w-full sm:w-auto'
              >
                <FormField
                  control={form.control}
                  name='searchTerm'
                  render={({ field }) => (
                    <FormItem className='mr-4'>
                      <FormLabel className='sr-only'>Search</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={'Search...'}
                          className='h-9 lg:w-[250px]'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  size='icon'
                  variant='default'
                  disabled={isLoading}
                  className='w-20'
                >
                  {isLoading ? '검색 중...' : '검색'}
                </Button>
              </form>
            </Form>
          </div>
          <TestPrimaryButtons />
        </div>

        <div className='-mx-4 mt-2 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable
            data={tableData}
            total={data?.count || 0}
            columns={columns}
            isLoading={isLoading}
            pagination={pagination}
            onPaginationChange={onPaginationChange}
          />
        </div>
      </Main>
      <TestDialogs handleSuccess={handleSuccess} />
    </TestProvider>
  )
}

export default Test
