import { toast } from 'react-toastify'

import { GET_PAYMENTS } from '@/src/features/user/api/user.service'
import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { RoundLoader } from '@/src/shared/ui/RouterLoader/RoundLoader'
import { getDateViewWithDots } from '@/src/shared/utils/date'
import { useQuery } from '@apollo/client'
import { Pagination, Table, Typography } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './Payments.module.scss'

interface IProps {
  userId: number
}

export const Payments = ({ userId }: IProps) => {
  const t = useTranslations('UserPage.t-payments')

  const { changeQueryHandler, searchParams } = useParamsHook()

  const page = searchParams.get('page') ?? 1
  const pageSize = searchParams.get('pageSize') ?? 10

  const { data, error, loading } = useQuery(GET_PAYMENTS, { variables: { userId } })

  const onChangePageHandler = (page: number) => {
    changeQueryHandler({ page: page })
  }

  const onChangePageSizeHandler = (pageSize: number) => {
    changeQueryHandler({ page: 1, pageSize: pageSize })
  }

  const payments = data?.getPaymentsByUser.items

  const isHasPayments = payments && payments.length > 0

  if (error) {
    toast.error(`${t('fetch-error')}`)
  }

  if (loading) {
    return (
      <div className={s.loader}>
        <RoundLoader variant={'large'} />
      </div>
    )
  }

  if (!isHasPayments) {
    return (
      <div className={s.centerBox}>
        <Typography variant={'h2'}>{t('no-payments')}</Typography>
      </div>
    )
  }

  return (
    <div className={s.payments}>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>{t('date-of-payment')}</Table.HeadCell>
            <Table.HeadCell>{t('end-date-of-subscription')}</Table.HeadCell>
            <Table.HeadCell>{t('price')}</Table.HeadCell>
            <Table.HeadCell>{t('subscription-type')}</Table.HeadCell>
            <Table.HeadCell>{t('payment-type')}</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {payments.map(p => (
            <Table.Row key={p.id}>
              <Table.Cell>{getDateViewWithDots(new Date(p.dateOfPayment))}</Table.Cell>
              <Table.Cell>{getDateViewWithDots(new Date(p.endDate))}</Table.Cell>
              <Table.Cell>{p.price}</Table.Cell>
              <Table.Cell>{p.type}</Table.Cell>
              <Table.Cell>{p.paymentType}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        onChangePage={onChangePageHandler}
        onChangePortionSize={onChangePageSizeHandler}
        page={Number(page)}
        portionSize={Number(pageSize)}
        totalCount={data.getPaymentsByUser.totalCount}
      />
    </div>
  )
}
