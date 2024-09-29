import { GetAllUsersQuery } from '@/src/gql/graphql'
import { BlockIcon, EllipsisIcon } from '@/src/shared/assets/icons'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { RoundLoader } from '@/src/shared/ui/RouterLoader/RoundLoader'
import { getDateViewWithDots } from '@/src/shared/utils/date'
import { Table } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'

import s from './Userstable.module.scss'

interface IProps {
  data?: GetAllUsersQuery
  loading: boolean
  onSortChange: (column: string) => void
  sortBy: string
  sortDirection: 'asc' | 'desc'
}

export const UsersTable = ({ data, loading, onSortChange, sortBy, sortDirection }: IProps) => {
  const renderSortIcon = (column: string) => {
    if (sortBy === column) {
      return (
        <div className={s.sortIcons}>
          {sortDirection === 'asc' ? (
            <span className={`${s.sortIcon} ${s.active}`}></span>
          ) : (
            <span className={`${s.sortIcon} ${s.active} ${s.desc}`}></span>
          )}
        </div>
      )
    }

    return (
      <div className={s.sortIcons}>
        <span className={s.smallIcon}></span>
        <span className={`${s.smallIcon} ${s.desc}`}></span>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={s.loader}>
        <RoundLoader variant={'large'} />
      </div>
    )
  }

  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>User ID</Table.HeadCell>
          <Table.HeadCell onClick={() => onSortChange('userName')}>
            <div className={s.sortableColumn}>Username{renderSortIcon('userName')}</div>
          </Table.HeadCell>
          <Table.HeadCell>Profile link</Table.HeadCell>
          <Table.HeadCell onClick={() => onSortChange('createdAt')}>
            <div className={s.sortableColumn}>Date added{renderSortIcon('createdAt')}</div>
          </Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Row>
      </Table.Head>
      {data && (
        <Table.Body>
          {data.getUsers.users.map(u => (
            <Table.Row key={u.id}>
              <Table.Cell className={u.userBan?.reason && s.cellWithIcon}>
                {u.userBan?.reason && <BlockIcon />} <span>{u.id}</span>
              </Table.Cell>
              <Table.Cell>{u.userName}</Table.Cell>
              <Table.Cell>
                <Link href={`${RouterPaths.USER}/${u.id}`}>{u.userName}</Link>
              </Table.Cell>
              <Table.Cell>{getDateViewWithDots(u.createdAt)}</Table.Cell>
              <Table.Cell>
                <EllipsisIcon className={s.icon} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      )}
    </Table.Root>
  )
}
