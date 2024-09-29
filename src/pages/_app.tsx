// pages/_app.tsx
import type { AppProps } from 'next/app'

import { ReactElement, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import client from '@/apollo-client'
import { ApolloProvider } from '@apollo/client'
import Cookies from 'js-cookie'
import { NextPage } from 'next'
import { NextIntlClientProvider } from 'next-intl'

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
  const initialLanguage = Cookies.get('next-language') || 'ru'

  return (
    <ApolloProvider client={client}>
      <NextIntlClientProvider
        locale={initialLanguage}
        messages={pageProps.messages}
        timeZone={'Europe/Moscow'}
      >
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer
          autoClose={5000}
          closeOnClick
          draggable
          hideProgressBar={false}
          newestOnTop={false}
          pauseOnFocusLoss
          pauseOnHover
          position={'bottom-right'}
          rtl={false}
          theme={'dark'}
        />
      </NextIntlClientProvider>
    </ApolloProvider>
  )
}
