import { SubscriptionPaymentsModel } from '@/src/gql/graphql'
import { getDateViewWithDots } from '@/src/shared/utils/date'
import { renderSortIcon } from '@/src/shared/utils/render-sort-icons/render-sort-icons'
import { Table, Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import s from './PaymentsTable.module.scss'

import baseAvatar from './../../../../../public/images/avatar.webp'
export type PaymentsTableProps = {
  data: SubscriptionPaymentsModel[]
  onSortChange: (column: string) => void
  sortBy: string
  sortDirection: 'asc' | 'desc'
}

export const PaymentsTable = ({
  data,
  onSortChange,
  sortBy,
  sortDirection,
}: PaymentsTableProps) => {
  return (
    <Table.Root className={s.paymentTable}>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell onClick={() => onSortChange('userName')}>
            <div className={s.sortableColumn}>
              <Typography variant={'subTitle1'}>{'UserName'}</Typography>
              {renderSortIcon('userName', sortBy, sortDirection)}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => onSortChange('createdAt')}>
            <div className={s.sortableColumn}>
              <Typography variant={'subTitle1'}>{'Date added'}</Typography>
              {renderSortIcon('createdAt', sortBy, sortDirection)}
            </div>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => onSortChange('amount')}>
            <div className={s.sortableColumn}>
              <Typography variant={'subTitle1'}>{'Amount, $'}</Typography>
              {renderSortIcon('amount', sortBy, sortDirection)}
            </div>
          </Table.HeadCell>
          <Table.HeadCell>
            <Typography variant={'subTitle1'}>{'Subscription'}</Typography>
          </Table.HeadCell>
          <Table.HeadCell onClick={() => onSortChange('paymentMethod')}>
            <div className={s.sortableColumn}>
              <Typography variant={'subTitle1'}>{'Payment method'}</Typography>
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
                <Typography variant={'body1'}>{payment.userName}</Typography>
              </div>
            </Table.Cell>
            <Table.Cell>
              <Typography variant={'body1'}>{getDateViewWithDots(payment.createdAt)}</Typography>
            </Table.Cell>
            <Table.Cell>
              <Typography variant={'body1'}>{payment.amount}$</Typography>
            </Table.Cell>
            <Table.Cell>
              <Typography variant={'body1'}>{payment.type}</Typography>
            </Table.Cell>
            <Table.Cell>
              <Typography variant={'body1'}>{payment.paymentMethod}</Typography>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
