import { useMutation } from '@tanstack/react-query'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import supabase from '../../../server/supabase'
import { Fruit } from '../types'

// 새로운 과일 데이터를 생성하는 함수
const createFruit = async (
  fruit: Omit<Fruit, 'id'> // id는 생성 시 필요하지 않으므로 제외
): Promise<PostgrestSingleResponse<Fruit[]>> => {
  const { name, description, category } = fruit
  const response: PostgrestSingleResponse<Fruit[]> = await supabase
    .from('fruits')
    .insert({ name, description, category })
    .select() // 생성된 데이터를 반환받기 위해 select 추가

  return response
}

// use-create 훅 정의
export const useCreate = () => {
  return useMutation({
    mutationFn: (fruit: Omit<Fruit, 'id'>) => createFruit(fruit),
  })
}
