import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  concat
} from '@apollo/client/core'

export function createApolloClient() {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
  })

  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('todoapp-token')
    operation.setContext({
      headers: {
        authorization: token ? token : ''
      }
    })
    return forward(operation)
  })

  const cache = new InMemoryCache()

  const apolloClient = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache
  })

  return apolloClient
}
