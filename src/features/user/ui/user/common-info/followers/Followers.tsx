import { toast } from 'react-toastify'

import { GET_FOLLOWERS } from '@/src/features/user/api/user.service'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { RoundLoader } from '@/src/shared/ui/RouterLoader/RoundLoader'
import { useQuery } from '@apollo/client'
import { Pagination, Table, Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import s from './Followers.module.scss'

interface IProps {
  userId: number
}

export const Followers = ({ userId }: IProps) => {
  const t = useTranslations('UserPage.t-followers')

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

  if (!isHasFollowers) {
    return (
      <div className={s.centerBox}>
        <Typography variant={'h2'}>{t('no-followers')}</Typography>
      </div>
    )
  }

  return (
    <div className={s.followers}>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>{t('id')}</Table.HeadCell>
            <Table.HeadCell>{t('name')}</Table.HeadCell>
            <Table.HeadCell>{t('profile-link')}</Table.HeadCell>
            <Table.HeadCell>{t('subs-date')}</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {followers.map(f => (
            <Table.Row key={f.id}>
              <Table.Cell>{f.userId}</Table.Cell>
              <Table.Cell>{f.userName}</Table.Cell>
              <Table.Cell>
                <Link href={`${RouterPaths.PUBLIC_USER}/${userId}`}>{f.userName}</Link>
              </Table.Cell>
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
