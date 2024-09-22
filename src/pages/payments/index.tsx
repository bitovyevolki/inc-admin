import { ReactElement } from 'react'

import { Layout } from '@/src/shared/ui/layout/Layout'

import { NextPageWithLayout } from '../_app'

const PaymentsPage: NextPageWithLayout = (props: any) => {
  return <div {...props}>payments</div>
}

PaymentsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout withSidebar>{page}</Layout>
}

export default PaymentsPage
