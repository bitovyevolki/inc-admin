import { ReactElement } from 'react'

import { SignInForm } from '@/src/features/auth/signIn'
import { Layout } from '@/src/shared/ui/layout/Layout'
import { GetServerSideProps } from 'next'

import { NextPageWithLayout } from './_app'

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
      locale,
      messages,
    },
  }
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default HomePage
