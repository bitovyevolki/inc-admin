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
