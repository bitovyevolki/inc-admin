import { gql } from '@/src/gql'

export const GET_USER = gql(/* GraphQL */ `
  query getUser($userId: Int!) {
    getUser(userId: $userId) {
      createdAt
      userName
      email
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
  query getPayments($userId: Int!, $pageSize: Int, $page: Int) {
    getPaymentsByUser(userId: $userId, pageSize: $pageSize, pageNumber: $page) {
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
  query getFollowers($userId: Int!, $pageSize: Int, $page: Int) {
    getFollowers(userId: $userId, pageSize: $pageSize, pageNumber: $page) {
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
  query getFollowing($userId: Int!, $pageSize: Int, $page: Int) {
    getFollowing(userId: $userId, pageSize: $pageSize, pageNumber: $page) {
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
