// pages/_app.tsx
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import client from '@/apollo-client'
import { ApolloProvider } from '@apollo/client'
import '@/src/shared/styles/globals.scss'
import { Layout } from '../shared/ui/layout/Layout'
import { NextIntlClientProvider } from 'next-intl'
import { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>)

  return (
    <ApolloProvider client={client}>
      {/* <NextIntlClientProvider messages={pageProps.messages} locale={pageProps.locale}> */}
      {getLayout(<Component {...pageProps} />)}
      {/* </NextIntlClientProvider> */}
    </ApolloProvider>
  )
}
