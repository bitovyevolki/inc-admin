import { GET_PAYMENTS } from '@/src/features/user/api/user.service'
import { useQuery } from '@apollo/client'

import s from './Payments.module.scss'

interface IProps {
  userId: number
}

export const Payments = ({ userId }: IProps) => {
  const { data } = useQuery(GET_PAYMENTS, { variables: { userId } })

  return <div className={s.payments}></div>
}
