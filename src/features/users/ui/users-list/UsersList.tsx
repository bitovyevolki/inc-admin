import { InputMaybe, SortDirection } from '@/src/gql/graphql'
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
  const sortBy = searchParams.get('sortBy') ?? 'userName'
  const sortDirection = (searchParams.get('sortDirection') ?? 'asc') as InputMaybe<SortDirection>

  const { data, error, loading } = useQuery(GET_ALL_USERS, {
    variables: { pageNumber: Number(page), pageSize: Number(pageSize), sortBy, sortDirection },
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
    changeQueryHandler({ pageSize: pageSize })
  }

  const totalCount = data?.getUsers.pagination.totalCount

  return (
    <div className={s.users}>
      <div className={s.topBox}>
        <Input />
        <Select onChange={() => {}} options={[]} value={''} variant={'large'} />
      </div>
      <UsersTable data={data} loading={loading} onSortChange={onSortChange} />
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
