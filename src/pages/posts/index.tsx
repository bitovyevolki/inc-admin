import { ReactElement } from 'react'

import { Posts } from '@/src/features/posts'
import { Layout } from '@/src/shared/ui/layout/Layout'
import { GetServerSideProps } from 'next'

import { NextPageWithLayout } from '../_app'

const PostsPage: NextPageWithLayout = (props: any) => {
  return <Posts {...props} />
}

PostsPage.getLayout = function getLayout(page: ReactElement) {
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

export default PostsPage
