import { ReactElement } from 'react'

import { UsersList } from '@/src/features/users'
import { Layout } from '@/src/shared/ui/layout/Layout'

import { NextPageWithLayout } from '../_app'

const UsersListPage: NextPageWithLayout = (props: any) => {
  return <UsersList {...props} />
}

UsersListPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout withSidebar>{page}</Layout>
}

export default UsersListPage
