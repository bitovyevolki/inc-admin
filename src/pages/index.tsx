import { ReactElement } from 'react'

import { Layout } from '@/src/shared/ui/layout/Layout'
import { NextPageWithLayout } from './_app'
import { SignInForm } from '@/src/features/auth/signIn'
import { GetServerSideProps } from 'next'

const HomePage: NextPageWithLayout = (props: any) => {
  return (
    <div {...props}>
      <SignInForm />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const locale = context.req.cookies['next-language'] || 'en'
  const messages = (await import(`../locales/${locale}.json`)).default

  return {
    props: {
      messages,
      locale,
    },
  }
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default HomePage
