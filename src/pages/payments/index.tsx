import { ReactElement } from 'react'

import { PaymentsList } from '@/src/features/paymets/ui/PaymentsList'
import { Layout } from '@/src/shared/ui/layout/Layout'
import { GetServerSideProps } from 'next'

import { NextPageWithLayout } from '../_app'

const PaymentsPage: NextPageWithLayout = (props: any) => {
  return <PaymentsList {...props} />
}

PaymentsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout withSidebar>{page}</Layout>
}
export const getServerSideProps: GetServerSideProps = async context => {
  const locale = context.req.cookies['next-language'] || 'en'
  const messages = (await import(`../../locales/${locale}.json`)).default

  return {
    props: {
      locale,
      messages,
    },
  }
}

export default PaymentsPage
