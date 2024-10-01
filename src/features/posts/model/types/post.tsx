import { GetAllPostsQuery } from '@/src/gql/graphql'

export type PostItem = GetAllPostsQuery['getPosts']['items'][number]
