import { ReactElement } from 'react'

import { Layout } from '@/src/shared/ui/layout/Layout'

import { NextPageWithLayout } from '../_app'

const PostsPage: NextPageWithLayout = (props: any) => {
  return <div {...props}>posts</div>
}

PostsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout withSidebar>{page}</Layout>
}

export default PostsPage
