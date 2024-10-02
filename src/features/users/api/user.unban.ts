import { gql } from '@/src/gql'

export const UNBAN_USER = gql(/* GraphQL */ `
  mutation unbanUser($userId: Int!) {
    unbanUser(userId: $userId)
  }
`)
