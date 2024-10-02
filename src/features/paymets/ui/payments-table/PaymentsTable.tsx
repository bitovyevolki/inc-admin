import { SubscriptionPaymentsModel } from '@/src/gql/graphql'
import { Table, Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import s from './PaymentsTable.module.scss'

import baseAvatar from './../../../../../public/images/avatar.webp'
export type PaymentsTableProps = {
  data: SubscriptionPaymentsModel[]
}
const formatDate = (dateString: null | string): string => {
  if (!dateString) {
    return '-'
  }
  const date = new Date(dateString)

  return `${date
    .getDate()
    .toString()
    .padStart(
      Number('2'),
      '0'
    )}.${(date.getMonth() + 1).toString().padStart(Number('2'), '0')}.${date.getFullYear()}`
}

export const PaymentsTable = ({ data }: PaymentsTableProps) => {
  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>{'UserName'}</Table.HeadCell>
          <Table.HeadCell>{'Date added'}</Table.HeadCell>
          <Table.HeadCell>{'Amount, $'}</Table.HeadCell>
          <Table.HeadCell>{'Subscription'}</Table.HeadCell>
          <Table.HeadCell>{'Payment method'}</Table.HeadCell>
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {data?.map(payment => (
          <Table.Row key={payment.id}>
            <Table.Cell className={s.userInfo}>
              <Image
                alt={''}
                className={s.avatar}
                height={30}
                src={payment.avatars?.[0]?.url || baseAvatar}
                width={30}
              />
              <Typography variant={'body1'}>{payment.userName}</Typography>
            </Table.Cell>
            <Table.Cell>{formatDate(payment.createdAt)}</Table.Cell>
            <Table.Cell>{payment.amount}$</Table.Cell>
            <Table.Cell>{payment.type}</Table.Cell>
            <Table.Cell>{payment.paymentMethod}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
