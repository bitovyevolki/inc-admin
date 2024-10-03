import { useState } from 'react'
import { toast } from 'react-toastify'

import { REMOVE_USER } from '@/src/features/user/api/user.service'
import { GetAllUsersQuery } from '@/src/gql/graphql'
import { BlockIcon, EllipsisIcon } from '@/src/shared/assets/icons'
import { EditUser } from '@/src/shared/assets/icons/editUser'
import { Unban } from '@/src/shared/assets/icons/unban'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { RoundLoader } from '@/src/shared/ui/RouterLoader/RoundLoader'
import { getDateViewWithDots } from '@/src/shared/utils/date'

import { renderSortIcon } from '@/src/shared/utils/render-sort-icons/render-sort-icons'

import { useMutation, useQuery } from '@apollo/client'
import { Button, Card, ModalWindow, Table, Typography } from '@bitovyevolki/ui-kit-int'

import * as Popover from '@radix-ui/react-popover'
import Link from 'next/link'

import s from './Userstable.module.scss'

import { ViewUserModal } from '../user-modal'
import { DeleteUserModal } from '../user-modal/DeleteUserModal'
import { UnBanUserModal } from '../user-modal/UnBanUserModal'
import { ViewBanModal } from '../user-modal/ViewBanModal'

interface IProps {
  data?: GetAllUsersQuery
  loading: boolean
  onSortChange: (column: string) => void
  refetch: () => void
  sortBy: string
  sortDirection: 'asc' | 'desc'
}

export const UsersTable = ({
  data,
  loading,
  onSortChange,
  refetch,
  sortBy,
  sortDirection,
}: IProps) => {
  const [removeUser] = useMutation<{ removeUser?: boolean }, { userId: number }>(REMOVE_USER, {})
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState<boolean>(false)
  const [isBanUserModalOpen, setIsBanUserModalOpen] = useState<boolean>(false)
  const [unBanModalOpen, setUnBanModalOpen] = useState<boolean>(false)
  const [currentUserId, setCurrentUserId] = useState<null | number>(null)

  const handleDeleteUser = async (userId: number) => {
    try {
      await removeUser({ variables: { userId } })
      setIsDeleteUserModalOpen(false)
      refetch()
      toast.success('User deleted', { position: 'top-right' })
    } catch (error) {
      toast.error('Error deleting user'),
        {
          position: 'top-right',
        }
    }
  }

  const showDeleteUserModal = (userId: number) => {
    setCurrentUserId(userId)
    setIsDeleteUserModalOpen(true)
  }

  const closeDeleteUserModalHandler = () => {
    setIsDeleteUserModalOpen(false)
    setCurrentUserId(null)
  }

  const showBanUserModal = (userId: number) => {
    setCurrentUserId(userId)
    setIsBanUserModalOpen(true)
  }

  const closeBanUserModalHandler = () => {
    setIsBanUserModalOpen(false)
    setCurrentUserId(null)
  }

  const showUnBanUserModal = (userId: number) => {
    setCurrentUserId(userId)
    setUnBanModalOpen(true)
  }

  const closeUnBanUserModalHandler = () => {
    setUnBanModalOpen(false)
    setCurrentUserId(null)
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
    <Table.Root className={s.userTable}>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>User ID</Table.HeadCell>
          <Table.HeadCell onClick={() => onSortChange('userName')}>
            <div className={s.sortableColumn}>
              Username{renderSortIcon('userName', sortBy, sortDirection)}
            </div>
          </Table.HeadCell>
          <Table.HeadCell>Profile link</Table.HeadCell>
          <Table.HeadCell onClick={() => onSortChange('createdAt')}>
            <div className={s.sortableColumn}>
              Date added{renderSortIcon('createdAt', sortBy, sortDirection)}
            </div>
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
              <Table.Cell>{u.userName}</Table.Cell>
              <Table.Cell>{getDateViewWithDots(u.createdAt)}</Table.Cell>
              <Table.Cell className={s.menuCell}>
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <EllipsisIcon className={s.icon} />
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content align={'end'} className={s.popoverContent} side={'bottom'}>
                      <Card className={s.cardWrap}>
                        <div className={s.popoverItem} onClick={() => showDeleteUserModal(u.id)}>
                          <EditUser />
                          Delete user
                        </div>
                        <ViewUserModal
                          isOpen={isDeleteUserModalOpen}
                          onOpenChange={closeDeleteUserModalHandler}
                        >
                          {currentUserId && (
                            <DeleteUserModal
                              closeViewPostModalHandler={closeDeleteUserModalHandler}
                              handleDeleteUser={handleDeleteUser}
                              userId={currentUserId}
                            />
                          )}
                        </ViewUserModal>
                        <div className={s.popoverItem}>
                          {u.userBan?.reason ? (
                            <div className={s.iconWrap} onClick={() => showUnBanUserModal(u.id)}>
                              <Unban /> Un-ban
                            </div>
                          ) : (
                            <div className={s.iconWrap} onClick={() => showBanUserModal(u.id)}>
                              <BlockIcon /> Ban in the system
                            </div>
                          )}
                        </div>
                        <ViewUserModal
                          isOpen={unBanModalOpen}
                          onOpenChange={closeUnBanUserModalHandler}
                        >
                          {currentUserId && (
                            <UnBanUserModal
                              closeUnBanUserModalHandler={closeUnBanUserModalHandler}
                              refetch={refetch}
                              userId={currentUserId}
                            />
                          )}
                        </ViewUserModal>
                        <ModalWindow
                          onOpenChange={closeBanUserModalHandler}
                          open={isBanUserModalOpen}
                          title={'Ban'}
                        >
                          {currentUserId !== null && (
                            <ViewBanModal
                              closeBanUserModalHandler={closeBanUserModalHandler}
                              refetch={refetch}
                              userId={currentUserId}
                              userName={u.userName}
                            />
                          )}
                        </ModalWindow>
                        <Link className={s.popoverItem} href={`${RouterPaths.USER}/${u.id}`}>
                          <EllipsisIcon />
                          More information
                        </Link>
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
