// pages/auth/sign-in.tsx
import { SignInForm } from '@/src/features/auth/signIn'
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from '../_app'
import { ReactElement } from 'react'
import { Layout } from '@/src/shared/ui/layout/Layout'

const SignInPage: NextPageWithLayout = (props: any) => {
  return <SignInForm {...props} />
}

// export const getServerSideProps: GetServerSideProps = async context => {
//   const locale = context.req.cookies['next-language'] || 'en' // Get the locale from cookies
//   const messages = (await import(`../../locales/${locale}.json`)).default

//   return {
//     props: {
//       messages, // Pass messages to the page
//       locale, // Pass locale to the page
//     },
//   }
// }

export default SignInPage
