import { gql } from '@/src/gql'

export const GET_ALL_USERS = gql(/* GraphQL */ `
  query getAllUsers(
    $pageNumber: Int
    $pageSize: Int
    $sortBy: String
    $sortDirection: SortDirection
    $searchTerm: String
  ) {
    getUsers(
      pageNumber: $pageNumber
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
    ) {
      pagination {
        totalCount
      }
      users {
        userName
        email
        id
        createdAt
        userBan {
          reason
        }
      }
    }
  }
`)
