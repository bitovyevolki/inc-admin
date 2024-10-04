import { gql } from '@/src/gql'

export const GET_USER = gql(/* GraphQL */ `
  query getUser($userId: Int!) {
    getUser(userId: $userId) {
      createdAt
      userName
      id
      profile {
        avatars {
          url
        }
      }
    }
  }
`)

export const GET_UPLOADED_FILES = gql(/* GraphQL */ `
  query getUploadedFiles($userId: Int!, $endCursorId: Int) {
    getPostsByUser(endCursorId: $endCursorId, userId: $userId) {
      totalCount
      items {
        id
        url
      }
    }
  }
`)

export const GET_PAYMENTS = gql(/* GraphQL */ `
  query getPayments(
    $userId: Int!
    $pageSize: Int
    $page: Int
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    getPaymentsByUser(
      userId: $userId
      pageSize: $pageSize
      pageNumber: $page
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      totalCount
      items {
        dateOfPayment
        endDate
        price
        paymentType
        type
        id
      }
    }
  }
`)

export const GET_FOLLOWERS = gql(/* GraphQL */ `
  query getFollowers(
    $userId: Int!
    $pageSize: Int
    $page: Int
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    getFollowers(
      userId: $userId
      pageSize: $pageSize
      pageNumber: $page
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      totalCount
      items {
        id
        userId
        userName
        createdAt
      }
    }
  }
`)

export const GET_FOLLOWING = gql(/* GraphQL */ `
  query getFollowing(
    $userId: Int!
    $pageSize: Int
    $page: Int
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    getFollowing(
      userId: $userId
      pageSize: $pageSize
      pageNumber: $page
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      totalCount
      items {
        id
        userId
        userName
        createdAt
      }
    }
  }
`)

export const REMOVE_USER = gql(/* GraphQL */ `
  mutation removeUser($userId: Int!) {
    removeUser(userId: $userId)
  }
`)
