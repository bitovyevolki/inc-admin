import { toast } from 'react-toastify'

import { GET_FOLLOWING } from '@/src/features/user/api/user.service'
import { GetFollowingQuery, InputMaybe, SortDirection } from '@/src/gql/graphql'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { RoundLoader } from '@/src/shared/ui/RouterLoader/RoundLoader'
import { getDateViewWithDots } from '@/src/shared/utils/date'
import { renderSortIcon } from '@/src/shared/utils/render-sort-icons/render-sort-icons'
import { useQuery } from '@apollo/client'
import { Pagination, Table, Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import s from './Following.module.scss'

type FollowingKeysType = keyof GetFollowingQuery['getFollowing']['items'][0]

interface IProps {
  userId: number
}

export const Following = ({ userId }: IProps) => {
  const t = useTranslations('UserPage.t-followers')

  const { changeQueryHandler, searchParams } = useParamsHook()

  const page = searchParams.get('page') ?? 1
  const pageSize = searchParams.get('pageSize') ?? 10
  const sortBy = searchParams.get('sortBy') ?? 'userName'
  const sortDirection = (searchParams.get('sortDirection') ?? 'asc') as InputMaybe<SortDirection>

  const { data, error, loading } = useQuery(GET_FOLLOWING, {
    variables: { page: Number(page), pageSize: Number(pageSize), sortBy, sortDirection, userId },
  })

  const onChangePageHandler = (page: number) => {
    changeQueryHandler({ page: page })
  }

  const onChangePageSizeHandler = (pageSize: number) => {
    changeQueryHandler({ page: 1, pageSize: pageSize })
  }

  const onSortChangeHandler = (column: FollowingKeysType) => {
    const newDirection = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc'

    changeQueryHandler({
      page: 1,
      pageSize: pageSize,
      sortBy: column,
      sortDirection: newDirection,
    })
  }

  const following = data?.getFollowing.items
  const totalCount = data?.getFollowing.totalCount

  const isHasFollowing = following && following.length > 0

  if (loading) {
    return (
      <div className={s.loader}>
        <RoundLoader variant={'large'} />
      </div>
    )
  }

  if (error) {
    toast.error(`${t('fetch-error')}`)
  }

  if (!isHasFollowing) {
    return (
      <div className={s.noFollowings}>
        <Typography variant={'h2'}>{t('no-followings')}</Typography>
      </div>
    )
  }

  return (
    <div className={s.following}>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>{t('id')}</Table.HeadCell>
            <Table.HeadCell onClick={() => onSortChangeHandler('userName')}>
              <div className={s.sortableColumn}>
                {t('name')}
                {renderSortIcon<FollowingKeysType>(
                  'userName',
                  sortBy,
                  sortDirection as 'asc' | 'desc'
                )}
              </div>
            </Table.HeadCell>
            <Table.HeadCell>{t('profile-link')}</Table.HeadCell>
            <Table.HeadCell onClick={() => onSortChangeHandler('createdAt')}>
              <div className={s.sortableColumn}>
                {t('subs-date')}
                {renderSortIcon<FollowingKeysType>(
                  'createdAt',
                  sortBy,
                  sortDirection as 'asc' | 'desc'
                )}
              </div>
            </Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {following.map(f => (
            <Table.Row key={f.id}>
              <Table.Cell>{f.userId}</Table.Cell>
              <Table.Cell>{f.userName}</Table.Cell>
              <Table.Cell className={s.link}>
                <Link href={`${RouterPaths.USER}/${f.userId}`}>{f.userName}</Link>
              </Table.Cell>
              <Table.Cell>{getDateViewWithDots(f.createdAt)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
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
