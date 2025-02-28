import { useQuery } from '@tanstack/react-query'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import supabase from '../../../server/supabase'

export type Fruit = {
  id: number
  name: string
  description: string | null
  category: string | null
}

const fetchSearchResults = async (
  searchTerm: string = '',
  pageIndex: number = 0,
  pageSize: number = 5
): Promise<PostgrestSingleResponse<Fruit[]>> => {
  // 0.4초 딜레이 추가
  await new Promise((resolve) => setTimeout(resolve, 400))

  let query = supabase.from('fruits').select('*', { count: 'exact' })

  if (searchTerm) {
    query = query.or(
      `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
    )
  }

  // 페이지네이션된 데이터 가져오기
  const from = pageIndex * pageSize
  const to = from + pageSize - 1
  const response = await query.range(from, to)

  return response
}

export const useSearch = (
  searchTerm: string,
  pageIndex: number,
  pageSize: number
) => {
  return useQuery({
    queryKey: ['searchTerm', searchTerm, pageIndex, pageSize],
    queryFn: () => fetchSearchResults(searchTerm, pageIndex, pageSize),
    // enabled: false, // 초기 로드 방지
  })
}
