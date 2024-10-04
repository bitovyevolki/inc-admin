/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation signIn($email: String!, $password: String!) {\n    loginAdmin(email: $email, password: $password) {\n      logged\n    }\n  }\n':
    types.SignInDocument,
  '\n  query getAllPayments(\n    $pageNumber: Int\n    $pageSize: Int\n    $sortBy: String\n    $sortDirection: SortDirection\n    $searchTerm: String\n  ) {\n    getPayments(\n      pageNumber: $pageNumber\n      pageSize: $pageSize\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm: $searchTerm\n    ) {\n      items {\n        userName\n        userId\n        avatars {\n          url\n          width\n          height\n        }\n        amount\n        createdAt\n        type\n        paymentMethod\n        id\n      }\n      page\n      pagesCount\n      pageSize\n      totalCount\n    }\n  }\n':
    types.GetAllPaymentsDocument,
  '\n  query getAllPosts(\n    $endCursorPostId: Int\n    $searchTerm: String\n    $pageSize: Int = 10\n    $sortBy: String = "createdAt"\n    $sortDirection: SortDirection = desc\n  ) {\n    getPosts(\n      endCursorPostId: $endCursorPostId\n      searchTerm: $searchTerm\n      pageSize: $pageSize\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n    ) {\n      items {\n        id\n        ownerId\n        description\n        createdAt\n        updatedAt\n        postOwner {\n          id\n          userName\n          firstName\n          lastName\n          avatars {\n            url\n          }\n        }\n        images {\n          url\n          id\n          createdAt\n          width\n          height\n        }\n      }\n    }\n  }\n':
    types.GetAllPostsDocument,
  '\n  subscription onAddPostSubscription {\n    postAdded {\n      images {\n        url\n        id\n        createdAt\n        width\n        height\n      }\n      id\n      ownerId\n      description\n      createdAt\n      updatedAt\n      postOwner {\n        id\n        userName\n        firstName\n        lastName\n        avatars {\n          url\n        }\n      }\n      images {\n        url\n        id\n        createdAt\n        width\n        height\n      }\n    }\n  }\n':
    types.OnAddPostSubscriptionDocument,
  '\n  query getUser($userId: Int!) {\n    getUser(userId: $userId) {\n      createdAt\n      userName\n      id\n      profile {\n        avatars {\n          url\n        }\n      }\n    }\n  }\n':
    types.GetUserDocument,
  '\n  query getUploadedFiles($userId: Int!, $endCursorId: Int) {\n    getPostsByUser(endCursorId: $endCursorId, userId: $userId) {\n      totalCount\n      items {\n        id\n        url\n      }\n    }\n  }\n':
    types.GetUploadedFilesDocument,
  '\n  query getPayments(\n    $userId: Int!\n    $pageSize: Int\n    $page: Int\n    $sortBy: String\n    $sortDirection: SortDirection\n  ) {\n    getPaymentsByUser(\n      userId: $userId\n      pageSize: $pageSize\n      pageNumber: $page\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n    ) {\n      totalCount\n      items {\n        dateOfPayment\n        endDate\n        price\n        paymentType\n        type\n        id\n      }\n    }\n  }\n':
    types.GetPaymentsDocument,
  '\n  query getFollowers(\n    $userId: Int!\n    $pageSize: Int\n    $page: Int\n    $sortBy: String\n    $sortDirection: SortDirection\n  ) {\n    getFollowers(\n      userId: $userId\n      pageSize: $pageSize\n      pageNumber: $page\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n    ) {\n      totalCount\n      items {\n        id\n        userId\n        userName\n        createdAt\n      }\n    }\n  }\n':
    types.GetFollowersDocument,
  '\n  query getFollowing(\n    $userId: Int!\n    $pageSize: Int\n    $page: Int\n    $sortBy: String\n    $sortDirection: SortDirection\n  ) {\n    getFollowing(\n      userId: $userId\n      pageSize: $pageSize\n      pageNumber: $page\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n    ) {\n      totalCount\n      items {\n        id\n        userId\n        userName\n        createdAt\n      }\n    }\n  }\n':
    types.GetFollowingDocument,
  '\n  mutation removeUser($userId: Int!) {\n    removeUser(userId: $userId)\n  }\n':
    types.RemoveUserDocument,
  '\n  mutation unbanUser($userId: Int!) {\n    unbanUser(userId: $userId)\n  }\n':
    types.UnbanUserDocument,
  '\n  mutation banUser($banReason: String!, $userId: Int!) {\n    banUser(banReason: $banReason, userId: $userId)\n  }\n':
    types.BanUserDocument,
  '\n  query getAllUsers(\n    $pageNumber: Int\n    $pageSize: Int\n    $sortBy: String\n    $sortDirection: SortDirection\n    $searchTerm: String\n    $statusFilter: UserBlockStatus\n  ) {\n    getUsers(\n      pageNumber: $pageNumber\n      pageSize: $pageSize\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm: $searchTerm\n      statusFilter: $statusFilter\n    ) {\n      pagination {\n        totalCount\n      }\n      users {\n        userName\n        email\n        id\n        createdAt\n        userBan {\n          reason\n        }\n      }\n    }\n  }\n':
    types.GetAllUsersDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation signIn($email: String!, $password: String!) {\n    loginAdmin(email: $email, password: $password) {\n      logged\n    }\n  }\n'
): (typeof documents)['\n  mutation signIn($email: String!, $password: String!) {\n    loginAdmin(email: $email, password: $password) {\n      logged\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getAllPayments(\n    $pageNumber: Int\n    $pageSize: Int\n    $sortBy: String\n    $sortDirection: SortDirection\n    $searchTerm: String\n  ) {\n    getPayments(\n      pageNumber: $pageNumber\n      pageSize: $pageSize\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm: $searchTerm\n    ) {\n      items {\n        userName\n        userId\n        avatars {\n          url\n          width\n          height\n        }\n        amount\n        createdAt\n        type\n        paymentMethod\n        id\n      }\n      page\n      pagesCount\n      pageSize\n      totalCount\n    }\n  }\n'
): (typeof documents)['\n  query getAllPayments(\n    $pageNumber: Int\n    $pageSize: Int\n    $sortBy: String\n    $sortDirection: SortDirection\n    $searchTerm: String\n  ) {\n    getPayments(\n      pageNumber: $pageNumber\n      pageSize: $pageSize\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm: $searchTerm\n    ) {\n      items {\n        userName\n        userId\n        avatars {\n          url\n          width\n          height\n        }\n        amount\n        createdAt\n        type\n        paymentMethod\n        id\n      }\n      page\n      pagesCount\n      pageSize\n      totalCount\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getAllPosts(\n    $endCursorPostId: Int\n    $searchTerm: String\n    $pageSize: Int = 10\n    $sortBy: String = "createdAt"\n    $sortDirection: SortDirection = desc\n  ) {\n    getPosts(\n      endCursorPostId: $endCursorPostId\n      searchTerm: $searchTerm\n      pageSize: $pageSize\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n    ) {\n      items {\n        id\n        ownerId\n        description\n        createdAt\n        updatedAt\n        postOwner {\n          id\n          userName\n          firstName\n          lastName\n          avatars {\n            url\n          }\n        }\n        images {\n          url\n          id\n          createdAt\n          width\n          height\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getAllPosts(\n    $endCursorPostId: Int\n    $searchTerm: String\n    $pageSize: Int = 10\n    $sortBy: String = "createdAt"\n    $sortDirection: SortDirection = desc\n  ) {\n    getPosts(\n      endCursorPostId: $endCursorPostId\n      searchTerm: $searchTerm\n      pageSize: $pageSize\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n    ) {\n      items {\n        id\n        ownerId\n        description\n        createdAt\n        updatedAt\n        postOwner {\n          id\n          userName\n          firstName\n          lastName\n          avatars {\n            url\n          }\n        }\n        images {\n          url\n          id\n          createdAt\n          width\n          height\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  subscription onAddPostSubscription {\n    postAdded {\n      images {\n        url\n        id\n        createdAt\n        width\n        height\n      }\n      id\n      ownerId\n      description\n      createdAt\n      updatedAt\n      postOwner {\n        id\n        userName\n        firstName\n        lastName\n        avatars {\n          url\n        }\n      }\n      images {\n        url\n        id\n        createdAt\n        width\n        height\n      }\n    }\n  }\n'
): (typeof documents)['\n  subscription onAddPostSubscription {\n    postAdded {\n      images {\n        url\n        id\n        createdAt\n        width\n        height\n      }\n      id\n      ownerId\n      description\n      createdAt\n      updatedAt\n      postOwner {\n        id\n        userName\n        firstName\n        lastName\n        avatars {\n          url\n        }\n      }\n      images {\n        url\n        id\n        createdAt\n        width\n        height\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getUser($userId: Int!) {\n    getUser(userId: $userId) {\n      createdAt\n      userName\n      id\n      profile {\n        avatars {\n          url\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getUser($userId: Int!) {\n    getUser(userId: $userId) {\n      createdAt\n      userName\n      id\n      profile {\n        avatars {\n          url\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getUploadedFiles($userId: Int!, $endCursorId: Int) {\n    getPostsByUser(endCursorId: $endCursorId, userId: $userId) {\n      totalCount\n      items {\n        id\n        url\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getUploadedFiles($userId: Int!, $endCursorId: Int) {\n    getPostsByUser(endCursorId: $endCursorId, userId: $userId) {\n      totalCount\n      items {\n        id\n        url\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getPayments(\n    $userId: Int!\n    $pageSize: Int\n    $page: Int\n    $sortBy: String\n    $sortDirection: SortDirection\n  ) {\n    getPaymentsByUser(\n      userId: $userId\n      pageSize: $pageSize\n      pageNumber: $page\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n    ) {\n      totalCount\n      items {\n        dateOfPayment\n        endDate\n        price\n        paymentType\n        type\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getPayments(\n    $userId: Int!\n    $pageSize: Int\n    $page: Int\n    $sortBy: String\n    $sortDirection: SortDirection\n  ) {\n    getPaymentsByUser(\n      userId: $userId\n      pageSize: $pageSize\n      pageNumber: $page\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n    ) {\n      totalCount\n      items {\n        dateOfPayment\n        endDate\n        price\n        paymentType\n        type\n        id\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getFollowers(\n    $userId: Int!\n    $pageSize: Int\n    $page: Int\n    $sortBy: String\n    $sortDirection: SortDirection\n  ) {\n    getFollowers(\n      userId: $userId\n      pageSize: $pageSize\n      pageNumber: $page\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n    ) {\n      totalCount\n      items {\n        id\n        userId\n        userName\n        createdAt\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getFollowers(\n    $userId: Int!\n    $pageSize: Int\n    $page: Int\n    $sortBy: String\n    $sortDirection: SortDirection\n  ) {\n    getFollowers(\n      userId: $userId\n      pageSize: $pageSize\n      pageNumber: $page\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n    ) {\n      totalCount\n      items {\n        id\n        userId\n        userName\n        createdAt\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getFollowing(\n    $userId: Int!\n    $pageSize: Int\n    $page: Int\n    $sortBy: String\n    $sortDirection: SortDirection\n  ) {\n    getFollowing(\n      userId: $userId\n      pageSize: $pageSize\n      pageNumber: $page\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n    ) {\n      totalCount\n      items {\n        id\n        userId\n        userName\n        createdAt\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getFollowing(\n    $userId: Int!\n    $pageSize: Int\n    $page: Int\n    $sortBy: String\n    $sortDirection: SortDirection\n  ) {\n    getFollowing(\n      userId: $userId\n      pageSize: $pageSize\n      pageNumber: $page\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n    ) {\n      totalCount\n      items {\n        id\n        userId\n        userName\n        createdAt\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation removeUser($userId: Int!) {\n    removeUser(userId: $userId)\n  }\n'
): (typeof documents)['\n  mutation removeUser($userId: Int!) {\n    removeUser(userId: $userId)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation unbanUser($userId: Int!) {\n    unbanUser(userId: $userId)\n  }\n'
): (typeof documents)['\n  mutation unbanUser($userId: Int!) {\n    unbanUser(userId: $userId)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation banUser($banReason: String!, $userId: Int!) {\n    banUser(banReason: $banReason, userId: $userId)\n  }\n'
): (typeof documents)['\n  mutation banUser($banReason: String!, $userId: Int!) {\n    banUser(banReason: $banReason, userId: $userId)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getAllUsers(\n    $pageNumber: Int\n    $pageSize: Int\n    $sortBy: String\n    $sortDirection: SortDirection\n    $searchTerm: String\n    $statusFilter: UserBlockStatus\n  ) {\n    getUsers(\n      pageNumber: $pageNumber\n      pageSize: $pageSize\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm: $searchTerm\n      statusFilter: $statusFilter\n    ) {\n      pagination {\n        totalCount\n      }\n      users {\n        userName\n        email\n        id\n        createdAt\n        userBan {\n          reason\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getAllUsers(\n    $pageNumber: Int\n    $pageSize: Int\n    $sortBy: String\n    $sortDirection: SortDirection\n    $searchTerm: String\n    $statusFilter: UserBlockStatus\n  ) {\n    getUsers(\n      pageNumber: $pageNumber\n      pageSize: $pageSize\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm: $searchTerm\n      statusFilter: $statusFilter\n    ) {\n      pagination {\n        totalCount\n      }\n      users {\n        userName\n        email\n        id\n        createdAt\n        userBan {\n          reason\n        }\n      }\n    }\n  }\n']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
