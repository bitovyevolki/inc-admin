import { gql } from '@/src/gql'

export const BAN_USERS = gql(/* GraphQL */ `
  mutation banUser($banReason: String!, $userId: Int!) {
    banUser(banReason: $banReason, userId: $userId)
  }
`)
