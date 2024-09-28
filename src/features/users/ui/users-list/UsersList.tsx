import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { UserBlockStatus } from '@/src/gql/graphql'
import { SearchIcon } from '@/src/shared/assets/icons'
import { useQuery } from '@apollo/client'
import { Input, Pagination, Select } from '@bitovyevolki/ui-kit-int'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import s from './UsersList.module.scss'

import { GET_ALL_USERS } from '../../api/users.service'
import { UsersTable } from './users-table/UsersTable'

export const UsersList = () => {
  const t = useTranslations('UsersList')
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const page = searchParams.get('page') ?? 1
  const pageSize = searchParams.get('pageSize') ?? 10
  const searchTerm = searchParams.get('searchTerm')
  const statusFilter = searchParams.get('statusFilter') ?? 'all'

  const [filterValue, setFilterValue] = useState(searchTerm)

  const createQueryStringHandler = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const changeQueryHandler = useCallback(
    (name: string, value: string) => {
      router.push(pathname + '?' + createQueryStringHandler(name, value))
    },
    [createQueryStringHandler, pathname, router]
  )

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

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.currentTarget.value)
  }

  const onChangeBlocked = (newBlockedValue: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set('statusFilter', newBlockedValue)
    router.push(pathname + '?' + params.toString())
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
      <UsersTable data={data} />
      <Pagination
        onChangePage={onChangePageHandler}
        onChangePortionSize={onChangePageSizeHandler}
        page={Number(page)}
        portionSize={Number(pageSize)}
        totalCount={100}
      />
    </div>
  )
}
