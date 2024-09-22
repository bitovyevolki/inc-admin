import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'

import client from '@/apollo-client'
import { ApolloProvider } from '@apollo/client'
import { NextPage } from 'next'

import '@/src/shared/styles/globals.scss'

import { Layout } from '../shared/ui/layout/Layout'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>)
  // const { props, store } = wrapper.useWrappedStore(rest)

  return <ApolloProvider client={client}>{getLayout(<Component {...pageProps} />)}</ApolloProvider>
}
