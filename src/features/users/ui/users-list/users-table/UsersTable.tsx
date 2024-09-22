import { GetAllUsersQuery } from '@/src/gql/graphql'
import { Table } from '@bitovyevolki/ui-kit-int'

interface IProps {
  data?: GetAllUsersQuery
}

export const UsersTable = ({ data }: IProps) => {
  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>User ID</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Profile link</Table.HeadCell>
          <Table.HeadCell>Date added</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data &&
          data.getUsers.users.map(u => (
            <Table.Row key={u.id}>
              <Table.Cell>{u.id}</Table.Cell>
              <Table.Cell>{u.userName}</Table.Cell>
              <Table.Cell>{u.email}</Table.Cell>
              <Table.Cell>{u.createdAt}</Table.Cell>
              <Table.Cell>options</Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  )
}
