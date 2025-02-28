import { useState } from 'react'

export type Pagination = {
  pageIndex: number
  pageSize: number
}

export const usePagination = (
  initialValues: Pagination = { pageIndex: 0, pageSize: 10 }
) => {
  const [pagination, setPagination] = useState<Pagination>(initialValues)

  const onPageSizeChange = (pageSize: number) => {
    setPagination((prev) => {
      return {
        ...prev,
        pageSize,
      }
    })
  }

  return {
    pagination,
    onPaginationChange: setPagination,
    onPageSizeChange: onPageSizeChange,
  }
}
