import { REMOVE_USER } from '@/src/features/user/api/user.service'
import { GetAllUsersQuery } from '@/src/gql/graphql'
import { BlockIcon, EllipsisIcon } from '@/src/shared/assets/icons'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { RoundLoader } from '@/src/shared/ui/RouterLoader/RoundLoader'
import { getDateViewWithDots } from '@/src/shared/utils/date'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Card, Table, Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'
import * as Popover from '@radix-ui/react-popover'
import { toast } from 'react-toastify'

import s from './UsersTable.module.scss'
import { useState } from 'react'
import { ViewUserModal } from '../user-modal'
import { EditUser } from '@/src/shared/assets/icons/editUser'

interface IProps {
  data?: GetAllUsersQuery
  loading: boolean
  onSortChange: (column: string) => void
  sortBy: string
  sortDirection: 'asc' | 'desc'
  refetch: () => void
}

export const UsersTable = ({
  data,
  loading,
  onSortChange,
  sortBy,
  sortDirection,
  refetch,
}: IProps) => {
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

  const [removeUser] = useMutation<{ removeUser?: boolean }, { userId: number }>(REMOVE_USER, {})
  const [isViewUserModalOpen, setIsUserPostModalOpen] = useState<boolean>(false)

  const handleDeleteUser = async (userId: number) => {
    try {
      await removeUser({ variables: { userId } })
      setIsUserPostModalOpen(false)
      refetch()
      toast.success('User deleted', { position: 'top-right' })
    } catch (error) {
      toast.error('Error deleting user'),
        {
          position: 'top-right',
        }
    }
  }

  const showUserModal = () => {
    setIsUserPostModalOpen(true)
  }
  const closeViewPostModalHandler = () => {
    setIsUserPostModalOpen(false)
  }

  if (loading) {
    return (
      <div className={s.loader}>
        <RoundLoader variant={'large'} />
      </div>
    )
  }

  if (!data) {
    return <div>No users available</div>
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
        <Table.Body className={s.tBody}>
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
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <EllipsisIcon className={s.icon} />
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content align="end" className={s.popoverContent} side="bottom">
                      <Card className={s.cardWrap}>
                        <div className={s.popoverItem} onClick={() => showUserModal()}>
                          <EditUser />
                          Delete user
                        </div>
                        <ViewUserModal
                          isOpen={isViewUserModalOpen}
                          onOpenChange={closeViewPostModalHandler}
                        >
                          <div className={s.card}>
                            <Typography as={'p'} variant={'body1'}>
                              Are you sure you want to delete this post
                            </Typography>
                            <div className={s.buttonsContainer}>
                              <Button onClick={() => handleDeleteUser(u.id)}>Yes</Button>
                              <Button onClick={() => closeViewPostModalHandler()}>No</Button>
                            </div>
                          </div>
                        </ViewUserModal>
                        <div className={s.popoverItem}>
                          <BlockIcon /> Ban in the system
                        </div>
                        <div className={s.popoverItem}>
                          <EllipsisIcon />
                          More information
                        </div>
                      </Card>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      )}
    </Table.Root>
  )
}
