import React from 'react'

import { GET_ALL_PAYMENTS } from '@/src/features/paymets/api/payments.service'
import { PaymentsTable } from '@/src/features/paymets/ui/payments-table/PaymentsTable'
import { InputMaybe, SortDirection } from '@/src/gql/graphql'
import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { useQuery } from '@apollo/client'
import { Input, Pagination } from '@bitovyevolki/ui-kit-int'

import s from './PaymentsList.module.scss'
export const PaymentsList = () => {
  const { changeQueryHandler, searchParams } = useParamsHook()

  const page = searchParams.get('page') ?? 1
  const pageSize = searchParams.get('pageSize') ?? 10
  const sortBy = searchParams.get('sortBy') ?? 'userName'
  const sortDirection = (searchParams.get('sortDirection') ?? 'asc') as InputMaybe<SortDirection>
  const searchTerm = searchParams.get('searchTerm')

  const { data } = useQuery(GET_ALL_PAYMENTS, {
    variables: {
      pageNumber: Number(page),
      pageSize: Number(pageSize),
      searchTerm,
      sortBy,
      sortDirection,
    },
  })
  const totalCount = data?.getPayments?.totalCount
  const onChangePageHandler = (page: number) => {
    changeQueryHandler({ page: page })
  }

  const onChangePageSizeHandler = (pageSize: number) => {
    changeQueryHandler({ page: 1, pageSize: pageSize })
  }
  const onSortChange = (column: string) => {
    const newDirection = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc'

    changeQueryHandler({
      page: 1,
      pageSize: pageSize,
      sortBy: column,
      sortDirection: newDirection,
    })
  }

  return (
    <div className={s.paymentsList}>
      <Input type={'search'} />
      <PaymentsTable
        data={data?.getPayments?.items}
        onSortChange={onSortChange}
        sortBy={sortBy}
        sortDirection={sortDirection as 'asc' | 'desc'}
      />
      {totalCount && (
        <Pagination
          onChangePage={onChangePageHandler}
          onChangePortionSize={onChangePageSizeHandler}
          page={Number(page)}
          portionSize={Number(pageSize)}
          totalCount={totalCount}
        />
      )}
    </div>
  )
}
