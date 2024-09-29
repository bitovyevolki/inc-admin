import { ReactElement } from 'react'

import { User } from '@/src/features/user'
import { Layout } from '@/src/shared/ui/layout/Layout'
import { GetServerSideProps } from 'next'

import { NextPageWithLayout } from '../../_app'

const UserPage: NextPageWithLayout = (props: any) => {
  return <User {...props} />
}

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async context => {
  const locale = context.req.cookies['next-language'] || 'en'
  const messages = (await import(`../../../locales/${locale}.json`)).default

  return {
    props: {
      locale,
      messages,
    },
  }
}

export default UserPage
