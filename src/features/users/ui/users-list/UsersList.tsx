import { useQuery } from '@apollo/client'
import { Input, Pagination, Select } from '@bitovyevolki/ui-kit-int'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import s from './UsersList.module.scss'

import { GET_ALL_USERS } from '../../api/users.service'
import { UsersTable } from './users-table/UsersTable'

export const UsersList = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const page = searchParams.get('page') ?? 1
  const pageSize = searchParams.get('pageSize') ?? 10

  const { data, error, loading } = useQuery(GET_ALL_USERS, {
    variables: { pageNumber: Number(page), pageSize: Number(pageSize) },
  })
  const createQueryStringHandler = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set(name, value)

    return params.toString()
  }

  const changeQueryHandler = (name: string, value: number) => {
    router.push(pathname + '?' + createQueryStringHandler(name, String(value)))
  }

  const onChangePageHandler = (page: number) => {
    changeQueryHandler('page', page)
  }

  const onChangePageSizeHandler = (pageSize: number) => {
    changeQueryHandler('pageSize', pageSize)
  }

  const totalCount = data?.getUsers.pagination.totalCount

  return (
    <div className={s.users}>
      <div className={s.topBox}>
        <Input />
        <Select onChange={() => {}} options={[]} value={''} variant={'large'} />
      </div>
      <UsersTable data={data} loading={loading} />
      {totalCount && (
        <Pagination
          onChangePage={onChangePageHandler}
          onChangePortionSize={onChangePageSizeHandler}
          page={Number(page)}
          portionSize={Number(pageSize)}
          totalCount={data?.getUsers.pagination.totalCount}
        />
      )}
    </div>
  )
}
