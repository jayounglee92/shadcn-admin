import { useMutation } from '@tanstack/react-query'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import supabase from '../../../server/supabase'
import { Fruit } from '../types'

const modifyFruit = async (
  fruit: Fruit
): Promise<PostgrestSingleResponse<Fruit[]>> => {
  const { id, name, description, category } = fruit
  const response: PostgrestSingleResponse<Fruit[]> = await supabase
    .from('fruits')
    .update({ name, description, category })
    .eq('id', id)
    .select()

  return response
}

export const useEdit = () => {
  return useMutation({
    mutationFn: (fruit: Fruit) => modifyFruit(fruit),
  })
}
