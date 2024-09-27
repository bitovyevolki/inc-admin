import { ReactElement } from 'react'

import { Layout } from '@/src/shared/ui/layout/Layout'

import { NextPageWithLayout } from '../../_app'

const UserPage: NextPageWithLayout = (props: any) => {
  return <div />
}

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default UserPage
