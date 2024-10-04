import { SubscriptionPaymentsModel } from '@/src/gql/graphql'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { RoundLoader } from '@/src/shared/ui/RouterLoader/RoundLoader'
import { getDateViewWithDots } from '@/src/shared/utils/date'
import { renderSortIcon } from '@/src/shared/utils/render-sort-icons/render-sort-icons'
import { Table, Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import s from './PaymentsTable.module.scss'

import baseAvatar from './../../../../../public/images/avatar.webp'
export type PaymentsTableProps = {
  data: SubscriptionPaymentsModel[]
  loading: boolean
  onSortChange: (column: string) => void
  sortBy: string
  sortDirection: 'asc' | 'desc'
}

export const PaymentsTable = ({
  data,
  loading,
  onSortChange,
  sortBy,
  sortDirection,
}: PaymentsTableProps) => {
  const t = useTranslations('PaymentList')

  if (loading) {
    return (
      <div className={s.loader}>
        <RoundLoader variant={'large'} />
      </div>
    )
  }
  if (!data || data.length === 0) {
    return (
      <Typography className={s.noUsers} variant={'h3'}>
        {'No users available'}
      </Typography>
    )
  }

  return (
    <Table.Root className={s.paymentTable}>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell onClick={() => onSortChange('userName')}>
            <div className={s.sortableColumn}>
              <Typography variant={'subTitle2'}>{t('UserName')}</Typography>
              {renderSortIcon('userName', sortBy, sortDirection)}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => onSortChange('createdAt')}>
            <div className={s.sortableColumn}>
              <Typography variant={'subTitle2'}>{t('Date added')}</Typography>
              {renderSortIcon('createdAt', sortBy, sortDirection)}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => onSortChange('amount')}>
            <div className={s.sortableColumn}>
              <Typography variant={'subTitle2'}>{t('Amount, $')}</Typography>
              {renderSortIcon('amount', sortBy, sortDirection)}
            </div>
          </Table.HeadCell>
          <Table.HeadCell>
            <Typography variant={'subTitle2'}>{t('Subscription')}</Typography>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => onSortChange('paymentMethod')}>
            <div className={s.sortableColumn}>
              <Typography variant={'subTitle2'}>{t('Payment method')}</Typography>
              {renderSortIcon('paymentMethod', sortBy, sortDirection)}
            </div>
          </Table.HeadCell>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {data?.map(payment => (
          <Table.Row key={payment.id}>
            <Table.Cell>
              <div className={s.userInfo}>
                <Image
                  alt={''}
                  className={s.avatar}
                  height={30}
                  src={payment.avatars?.[0]?.url || baseAvatar}
                  width={30}
                />
                <Typography variant={'body2'}>
                  <Link href={`${RouterPaths.USER}/${payment.userId}`}>{payment.userName}</Link>
                </Typography>
              </div>
            </Table.Cell>
            <Table.Cell>
              <Typography variant={'body2'}>{getDateViewWithDots(payment.createdAt)}</Typography>
            </Table.Cell>
            <Table.Cell>
              <Typography variant={'body2'}>{payment.amount}$</Typography>
            </Table.Cell>
            <Table.Cell>
              <Typography variant={'body2'}>{t(payment.type)}</Typography>
            </Table.Cell>
            <Table.Cell>
              <Typography variant={'body2'}>{payment.paymentMethod}</Typography>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
