import { GET_FOLLOWERS } from '@/src/features/user/api/user.service'
import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { RoundLoader } from '@/src/shared/ui/RouterLoader/RoundLoader'
import { useQuery } from '@apollo/client'
import { Pagination, Table, Typography } from '@bitovyevolki/ui-kit-int'

import s from './Followers.module.scss'

interface IProps {
  userId: number
}

export const Followers = ({ userId }: IProps) => {
  const { changeQueryHandler, searchParams } = useParamsHook()

  const page = searchParams.get('page') ?? 1
  const pageSize = searchParams.get('pageSize') ?? 10

  const { data, error, loading } = useQuery(GET_FOLLOWERS, { variables: { userId } })

  const onChangePageHandler = (page: number) => {
    changeQueryHandler({ page: page })
  }

  const onChangePageSizeHandler = (pageSize: number) => {
    changeQueryHandler({ page: 1, pageSize: pageSize })
  }

  const followers = data?.getFollowers.items

  const isHasFollowers = followers && followers.length > 0

  // if (error) {
  //   toast.error('My followers error')
  // }

  if (loading) {
    return (
      <div className={s.loader}>
        <RoundLoader variant={'large'} />
      </div>
    )
  }

  if (!isHasFollowers) {
    return (
      <div className={s.centerBox}>
        <Typography variant={'h2'}>The user does not have any followers yet</Typography>
      </div>
    )
  }

  return (
    <div className={s.followers}>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>User ID</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Profile link</Table.HeadCell>
            <Table.HeadCell>Subscription Date</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {followers.map(f => (
            <Table.Row key={f.id}>
              <Table.Cell>{f.userId}</Table.Cell>
              <Table.Cell>{f.userName}</Table.Cell>
              <Table.Cell>{f.userName}</Table.Cell>
              <Table.Cell>{f.createdAt}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        onChangePage={onChangePageHandler}
        onChangePortionSize={onChangePageSizeHandler}
        page={Number(page)}
        portionSize={Number(pageSize)}
        totalCount={data.getFollowers.totalCount}
      />
    </div>
  )
}
