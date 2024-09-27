import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

export default client
