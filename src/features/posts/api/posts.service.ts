import { gql } from '@/src/gql'

export const GET_ALL_POSTS = gql(/* GraphQL */ `
  query getAllPosts(
    $endCursorPostId: Int
    $searchTerm: String
    $pageSize: Int = 10
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getPosts(
      endCursorPostId: $endCursorPostId
      searchTerm: $searchTerm
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      items {
        id
        ownerId
        description
        createdAt
        updatedAt
        postOwner {
          id
          userName
          firstName
          lastName
          avatars {
            url
          }
        }
        images {
          url
          id
          createdAt
          width
          height
        }
      }
    }
  }
`)
