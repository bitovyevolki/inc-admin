import { ReactElement } from 'react'

import { Layout } from '@/src/shared/ui/layout/Layout'

import { NextPageWithLayout } from '../_app'

const UsersListPage: NextPageWithLayout = (props: any) => {
  return <div {...props}>users list</div>
}

UsersListPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout withSidebar>{page}</Layout>
}

export default UsersListPage
