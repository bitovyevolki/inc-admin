import { ReactElement } from 'react'

import { UsersList } from '@/src/features/users'
import { Layout } from '@/src/shared/ui/layout/Layout'
import { GetServerSideProps } from 'next'

import { NextPageWithLayout } from '../_app'

const UsersListPage: NextPageWithLayout = (props: any) => {
  return <UsersList {...props} />
}

UsersListPage.getLayout = function getLayout(page: ReactElement) {
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

export default UsersListPage
