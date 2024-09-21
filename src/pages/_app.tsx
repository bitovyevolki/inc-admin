import type { AppProps } from 'next/app'

import client from '@/apollo-client'
import { ApolloProvider } from '@apollo/client'

import '@/src/shared/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
