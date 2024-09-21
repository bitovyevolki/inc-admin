import { gql } from '@/src/gql/gql'
import { useMutation, useQuery } from '@apollo/client'

export const GET_ALL_USERS = gql(/* GraphQL */ `
  query getAllUsers($pageNumber: Int!, $pageSize: Int!) {
    getUsers(pageNumber: $pageNumber, pageSize: $pageSize) {
      users {
        userName
        email
      }
    }
  }
`)

export const GET_USER = gql(/* GraphQL */ `
  query getUser($id: Int!) {
    getUser(userId: $id) {
      userName
    }
  }
`)

export const LOGIN = gql(/* GraphQL */ `
  mutation login($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      logged
    }
  }
`)

export default function Home() {
  const { data: users } = useQuery(GET_ALL_USERS, { variables: { pageNumber: 1, pageSize: 10 } })
  const [login, { data }] = useMutation(LOGIN)
  const { data: user } = useQuery(GET_USER, { variables: { id: 23 } })

  const loginHandler = () => {
    login({ variables: { email: 'fetishfestoff@mail.ru', password: 'Test789!' } })
  }

  return <div onClick={loginHandler}>login</div>
}
