import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const httpLink = createHttpLink({
  uri: 'https://inctagram.work/api/v1/graphql',
})

const getCredentials = () => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  return username && password ? btoa(`${username}:${password}`) : null
}

const authLink = setContext((_, { headers }) => {
  const token = getCredentials()

  return {
    headers: {
      ...headers,
      Authorization: token ? `Basic ${token}` : '',
    },
  }
})

const wsLink = new WebSocketLink(new SubscriptionClient('ws://inctagram.work/api/v1/graphql'))

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)

    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})

export default client
