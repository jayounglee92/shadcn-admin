import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Test } from '../data/schema'
import { useEdit } from '../hooks/use-edit'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Test
  handleSuccess?: (updatedItem: Fruit) => void
}

const formSchema = z.object({
  name: z.string().min(1, 'Please select a status.'),
  description: z.string().min(1, 'Please select a label.'),
  category: z.string().min(1, 'Please choose a priority.'),
})

type TestForm = z.infer<typeof formSchema>

export function TasksMutateDrawer({
  open,
  onOpenChange,
  currentRow,
  handleSuccess,
}: Props) {
  const isUpdate = !!currentRow

  const form = useForm<TestForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
      name: '',
      description: '',
      category: '',
    },
  })

  const { mutate } = useEdit()

  const onSubmit = (data: TestForm) => {
    if (isUpdate && currentRow) {
      mutate(
        {
          id: currentRow.id,
          name: data.name,
          description: data.description,
          category: data.category,
        },
        {
          onSuccess: () => {
            toast({
              title: '수정 완료',
              description: '데이터가 성공적으로 수정되었습니다.',
            })
            onOpenChange(false)
            form.reset()
            handleSuccess(data)
          },
          onError: () => {
            toast({
              title: '수정 실패',
              description: '데이터 수정에 실패했습니다.',
            })
          },
        }
      )
    } else {
      // 새로운 데이터 추가 로직
      onOpenChange(false)
      form.reset()
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          <SheetTitle>{isUpdate ? '수정' : '추가'} Test</SheetTitle>
          <SheetDescription>
            {isUpdate ? '수정합니다.' : '추가합니다.'}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='tasks-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-5'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a name' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter a description' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem className='relative space-y-3'>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='과일' />
                        </FormControl>
                        <FormLabel className='font-normal'>과일</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='동물' />
                        </FormControl>
                        <FormLabel className='font-normal'>동물</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='기타' />
                        </FormControl>
                        <FormLabel className='font-normal'>기타</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button form='tasks-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
