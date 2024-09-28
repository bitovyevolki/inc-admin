import { ChangeEvent, useEffect, useState } from 'react'

import { UserBlockStatus } from '@/src/gql/graphql'
import { SearchIcon } from '@/src/shared/assets/icons'
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
  const searchTerm = searchParams.get('searchTerm')
  const statusFilter = searchParams.get('statusFilter') ?? 'all'

  const [filterValue, setFilterValue] = useState(searchTerm)

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (filterValue !== null) {
        changeQueryHandler('searchTerm', filterValue)
      }
    }, 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [changeQueryHandler, filterValue])

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

  const { data, error, loading } = useQuery(GET_ALL_USERS, {
    variables: {
      pageNumber: Number(page),
      pageSize: Number(pageSize),
      searchTerm,
      statusFilter: statusFilterValue,
    },
  })

  const onChangePageHandler = (page: number) => {
    changeQueryHandler('page', String(page))
  }

  const onChangePageSizeHandler = (pageSize: number) => {
    changeQueryHandler('pageSize', String(pageSize))
  }

  const totalCount = data?.getUsers.pagination.totalCount

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.currentTarget.value)
  }

  const onChangeBlocked = (newBlockedValue: string) => {
    changeQueryHandler('statusFilter', newBlockedValue)
  }

  const option = [
    { label: t('search.not-selected'), value: 'all' },
    { label: t('search.blocked'), value: 'blocked' },
    { label: t('search.unblocked'), value: 'unblocked' },
  ]

  return (
    <div className={s.users}>
      <div className={s.topBox}>
        <div className={s.search}>
          <Input
            className={s.input}
            onChange={onChangeInput}
            placeholder={t('search.placeholder')}
            value={filterValue || ''}
          />
          <SearchIcon className={s.searchIcon} />
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
      <UsersTable data={data} loading={loading} />
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
