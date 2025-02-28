import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaginationState } from '@tanstack/react-table'
import { Plus } from 'lucide-react'
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
import { Fruit, useSearch } from '@/features/test/hooks/use-search'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { TestDialogs } from './components/test-dialogs'
import TestProvider from './context/test-context'

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
  const { pagination, onPaginationChange } = usePagination()
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex w-full sm:w-auto'
          >
            <FormField
              control={form.control}
              name='searchTerm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='sr-only'>Search</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={'Search...'}
                      className='mr-4 h-9 w-52 lg:w-[250px]'
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
            <Button
              type='button'
              size='icon'
              variant='outline'
              disabled={isLoading}
              className='w-20'
            >
              추가
              <Plus />
            </Button>
          </form>
        </Form>
        <div className='-mx-4 mt-2 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable
            data={data?.data ?? []}
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
