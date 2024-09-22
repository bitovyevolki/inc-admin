import { ReactElement } from 'react'

import { Layout } from '@/src/shared/ui/layout/Layout'

import { NextPageWithLayout } from '../_app'

const StatisticsPage: NextPageWithLayout = (props: any) => {
  return <div {...props}>statistics</div>
}

StatisticsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout withSidebar>{page}</Layout>
}

export default StatisticsPage
