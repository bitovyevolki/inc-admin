import { ReactElement } from 'react'

import { User } from '@/src/features/user'
import { Layout } from '@/src/shared/ui/layout/Layout'

import { NextPageWithLayout } from '../../_app'

const UserPage: NextPageWithLayout = (props: any) => {
  return <User />
}

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default UserPage
