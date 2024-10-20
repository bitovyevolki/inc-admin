import { ChangeEvent, useState } from 'react'

import { InputMaybe, SortDirection, UserBlockStatus } from '@/src/gql/graphql'
import { useDebounce } from '@/src/shared/hooks/use-debounce'
import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { useQuery } from '@apollo/client'
import { Input, Pagination, Select } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './UsersList.module.scss'

import { GET_ALL_USERS } from '../../api/users.service'
import { UsersTable } from './users-table/UsersTable'

export const UsersList = () => {
  const t = useTranslations('UsersList')
  const { changeQueryHandler, searchParams } = useParamsHook()

  const page = searchParams.get('page') ?? 1
  const pageSize = searchParams.get('pageSize') ?? 10
  const sortBy = searchParams.get('sortBy') ?? 'userName'
  const sortDirection = (searchParams.get('sortDirection') ?? 'asc') as InputMaybe<SortDirection>
  const searchTerm = searchParams.get('searchTerm')
  const statusFilter = searchParams.get('statusFilter') ?? 'all'

  const [filterValue, setFilterValue] = useState(searchTerm)
  const debouncedValue = useDebounce(filterValue, 500)
  const statusFilterValue = (() => {
    switch (statusFilter) {
      case 'blocked':
        return UserBlockStatus.Blocked
      case 'unblocked':
        return UserBlockStatus.Unblocked
      default:
        return UserBlockStatus.All
    }
  })()

  const { data, loading, refetch } = useQuery(GET_ALL_USERS, {
    variables: {
      pageNumber: Number(page),
      pageSize: Number(pageSize),
      searchTerm: debouncedValue || '',
      sortBy,
      sortDirection,
      statusFilter: statusFilterValue,
    },
  })

  const onSortChange = (column: string) => {
    const newDirection = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc'

    changeQueryHandler({
      page: 1,
      pageSize: pageSize,
      sortBy: column,
      sortDirection: newDirection,
    })
  }

  const onChangePageHandler = (page: number) => {
    changeQueryHandler({ page: page })
  }

  const onChangePageSizeHandler = (pageSize: number) => {
    changeQueryHandler({ page: 1, pageSize: pageSize })
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.currentTarget.value)
  }
  const handleOnClear = () => {
    setFilterValue('')
  }

  const onChangeBlocked = (statusFilter: string) => {
    changeQueryHandler({ page: 1, statusFilter: statusFilter })
  }

  const option = [
    { label: t('search.not-selected'), value: 'all' },
    { label: t('search.blocked'), value: 'blocked' },
    { label: t('search.unblocked'), value: 'unblocked' },
  ]

  const totalCount = data?.getUsers.pagination.totalCount

  return (
    <div className={s.users}>
      <div className={s.topBox}>
        <div className={s.search}>
          <Input
            className={s.input}
            clear={handleOnClear}
            onChange={onChangeInput}
            placeholder={t('search.placeholder')}
            type={'search'}
            value={filterValue || ''}
          />
        </div>
        <div className={s.select}>
          <Select
            onChange={onChangeBlocked}
            options={option}
            value={statusFilter}
            variant={'large'}
          />
        </div>
      </div>

      <UsersTable
        data={data}
        loading={loading}
        onSortChange={onSortChange}
        refetch={refetch}
        sortBy={sortBy}
        sortDirection={sortDirection as 'asc' | 'desc'}
      />

      {totalCount && totalCount > 0 && (
        <div className={s.pagination}>
          <Pagination
            onChangePage={onChangePageHandler}
            onChangePortionSize={onChangePageSizeHandler}
            page={Number(page)}
            portionSize={Number(pageSize)}
            totalCount={totalCount}
          />
        </div>
      )}
    </div>
  )
}
