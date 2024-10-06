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
import { Card, ModalWindow, Table, Typography } from '@bitovyevolki/ui-kit-int'
import * as Popover from '@radix-ui/react-popover'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('UsersTable')
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
      toast.success(t('User deleted'))
    } catch (error) {
      toast.error(t('Error deleting user'))
    }
  }

  const [unbanUser] = useMutation<{ unbanUser: boolean }, { userId: number }>(UNBAN_USER)

  const handleUnbanUser = async () => {
    try {
      await unbanUser({ variables: { userId: currentUser?.id as number } })
      toast.success(t('User unbanned successfully'))
      closeModal()
      refetch()
    } catch (error) {
      toast.error(t('Failed to unban user'))
    }
  }

  const [banUser] = useMutation<{ banUser: boolean }, { banReason: string; userId: number }>(
    BAN_USERS
  )

  const handleBanUser = async (banReason: string) => {
    try {
      await banUser({ variables: { banReason, userId: currentUser?.id as number } })
      toast.success(t('User banned successfully'))
      closeModal()
      refetch()
    } catch (error) {
      toast.error(t('Failed to ban user'))
    }
  }

  const showModal = (user: UserType, modalName: ModalNames) => {
    setCurrentUser(user)
    setOpenedModal({ name: modalName, open: true })
  }

  const modalTitle = (() => {
    switch (openedModal.name) {
      case 'delete':
        return t('Delete user')
      case 'ban':
        return t('Ban user')
      case 'unban':
        return t('Unban user')
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
          <Table.HeadCell>{t('User ID')}</Table.HeadCell>
          <Table.HeadCell onClick={() => onSortChange('userName')}>
            <div className={s.sortableColumn}>
              {t('Username')}
              {renderSortIcon('userName', sortBy, sortDirection)}
            </div>
          </Table.HeadCell>
          <Table.HeadCell>{t('Profile link')}</Table.HeadCell>
          <Table.HeadCell onClick={() => onSortChange('createdAt')}>
            <div className={s.sortableColumn}>
              {t('Date added')}
              {renderSortIcon('createdAt', sortBy, sortDirection)}
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
              <Table.Cell>
                <Typography variant={'body2'}>{u.userName}</Typography>{' '}
              </Table.Cell>
              <Table.Cell>
                <Typography as={'a'} href={`${RouterPaths.USER}/${u.id}`} variant={'body2'}>
                  {u.userName}
                </Typography>
              </Table.Cell>
              <Table.Cell>
                <Typography variant={'body2'}>{getDateViewWithDots(u.createdAt)}</Typography>{' '}
              </Table.Cell>
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
                          {t('Delete user')}
                        </div>

                        <div className={s.popoverItem}>
                          {u.userBan?.reason ? (
                            <div className={s.iconWrap} onClick={() => showModal(u, 'unban')}>
                              <Unban /> {t('Unban user')}
                            </div>
                          ) : (
                            <div className={s.iconWrap} onClick={() => showModal(u, 'ban')}>
                              <BlockIcon /> {t('Ban in the system')}
                            </div>
                          )}
                        </div>

                        <Link className={s.popoverItem} href={`${RouterPaths.USER}/${u.id}`}>
                          <EllipsisIcon />
                          {t('More information')}
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
