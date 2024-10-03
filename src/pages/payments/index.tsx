import { ReactElement } from 'react'

import { PaymentsList } from '@/src/features/paymets/ui/PaymentsList'
import { Layout } from '@/src/shared/ui/layout/Layout'

import { NextPageWithLayout } from '../_app'

const PaymentsPage: NextPageWithLayout = (props: any) => {
  return <PaymentsList {...props} />
}

PaymentsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout withSidebar>{page}</Layout>
}

export default PaymentsPage
