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
import { useMutation } from '@apollo/client'
import { Card, ModalWindow, Table } from '@bitovyevolki/ui-kit-int'
import * as Popover from '@radix-ui/react-popover'
import Link from 'next/link'

import s from './Userstable.module.scss'

import { UNBAN_USER } from '../../../api/user.unban'
import { BAN_USERS } from '../../../api/userban'
import { ModalNames, UserType } from '../../../model/types/users'
import { BanUserModal } from '../user-modal/BanUserModal'
import { DeleteUserModal } from '../user-modal/DeleteUserModal'
import { UnBanUserModal } from '../user-modal/UnBanUserModal'

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
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [openedModal, setOpenedModal] = useState<{
    name: ModalNames
    open: boolean
  }>({ name: '', open: false })

  const closeModal = () => {
    setOpenedModal({ name: '', open: false })
    setCurrentUser(null)
  }

  const handleDeleteUser = async () => {
    try {
      await removeUser({ variables: { userId: currentUser?.id as number } })
      closeModal()
      refetch()
      toast.success('User deleted', { position: 'top-right' })
    } catch (error) {
      toast.error('Error deleting user'),
        {
          position: 'top-right',
        }
    }
  }

  const [unbanUser] = useMutation<{ unbanUser: boolean }, { userId: number }>(UNBAN_USER)

  const handleUnbanUser = async () => {
    try {
      await unbanUser({ variables: { userId: currentUser?.id as number } })
      toast.success('User unbanned successfully', { position: 'top-right' })
      closeModal()
      refetch()
    } catch (error) {
      toast.error('Failed to unban user', { position: 'top-right' })
    }
  }

  const [banUser] = useMutation<{ banUser: boolean }, { banReason: string; userId: number }>(
    BAN_USERS
  )

  const handleBanUser = async (banReason: string) => {
    try {
      await banUser({ variables: { banReason, userId: currentUser?.id as number } })
      toast.success('User banned successfully', { position: 'top-right' })
      closeModal()
      refetch()
    } catch (error) {
      toast.error('Failed to ban user', { position: 'top-right' })
    }
  }

  const showModal = (user: UserType, modalName: ModalNames) => {
    setCurrentUser(user)
    setOpenedModal({ name: modalName, open: true })
  }

  const modalTitle = (() => {
    switch (openedModal.name) {
      case 'delete':
        return 'Delete user'
      case 'ban':
        return 'Ban user'
      case 'unban':
        return 'Unban user'
      default:
        return ''
    }
  })()

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
                        <div className={s.popoverItem} onClick={() => showModal(u, 'delete')}>
                          <EditUser />
                          Delete user
                        </div>

                        <div className={s.popoverItem}>
                          {u.userBan?.reason ? (
                            <div className={s.iconWrap} onClick={() => showModal(u, 'unban')}>
                              <Unban /> Un-ban
                            </div>
                          ) : (
                            <div className={s.iconWrap} onClick={() => showModal(u, 'ban')}>
                              <BlockIcon /> Ban in the system
                            </div>
                          )}
                        </div>

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

      {currentUser && (
        <ModalWindow onOpenChange={closeModal} open={openedModal.open} title={modalTitle}>
          {openedModal.name === 'ban' && (
            <BanUserModal
              handleBanUser={handleBanUser}
              onCloseModal={closeModal}
              userName={currentUser.userName}
            />
          )}
          {openedModal.name === 'unban' && (
            <UnBanUserModal
              handleUnbanUser={handleUnbanUser}
              onCloseModal={closeModal}
              userName={currentUser.userName}
            />
          )}
          {openedModal.name === 'delete' && (
            <DeleteUserModal
              handleDeleteUser={handleDeleteUser}
              onCloseModal={closeModal}
              userName={currentUser.userName}
            />
          )}
        </ModalWindow>
      )}
    </Table.Root>
  )
}
