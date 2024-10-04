import { GetAllUsersQuery } from '@/src/gql/graphql'

export type UserType = GetAllUsersQuery['getUsers']['users'][0]

export type ModalNames = '' | 'ban' | 'delete' | 'unban'
