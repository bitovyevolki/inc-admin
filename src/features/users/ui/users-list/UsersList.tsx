import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { useQuery } from '@apollo/client'
import { Input, Pagination, Select } from '@bitovyevolki/ui-kit-int'

import s from './UsersList.module.scss'

import { GET_ALL_USERS } from '../../api/users.service'
import { UsersTable } from './users-table/UsersTable'

export const UsersList = () => {
  const { changeQueryHandler, searchParams } = useParamsHook()

  const page = searchParams.get('page') ?? 1
  const pageSize = searchParams.get('pageSize') ?? 10

  const { data, error, loading } = useQuery(GET_ALL_USERS, {
    variables: { pageNumber: Number(page), pageSize: Number(pageSize) },
  })

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
          totalCount={totalCount}
        />
      )}
    </div>
  )
}
