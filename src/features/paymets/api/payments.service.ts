import { gql } from '@apollo/client'

export const GET_ALL_PAYMENTS = gql(/* GraphQL */ `
  query getAllPayments(
    $pageNumber: Int
    $pageSize: Int
    $sortBy: String
    $sortDirection: SortDirection
    $searchTerm: String
  ) {
    getPayments(
      pageNumber: $pageNumber
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm: $searchTerm
    ) {
      items {
        userName
        avatars {
          url
          width
          height
        }
        amount
        createdAt
        type
        paymentMethod
        id
      }
      page
      pagesCount
      pageSize
      totalCount
    }
  }
`)
