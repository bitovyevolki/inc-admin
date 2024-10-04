import { FC } from 'react'

import { Button, Typography } from '@bitovyevolki/ui-kit-int'

import s from './ViewUserModal.module.scss'

import { UserType } from '../../../model/types/users'

export type DeleteUserModalProps = {
  handleDeleteUser: () => void
  onCloseModal: () => void
  userName: string
}

export const DeleteUserModal: FC<DeleteUserModalProps> = ({
  handleDeleteUser,
  onCloseModal,
  userName,
}) => {
  return (
    <div className={s.card}>
      <Typography as={'p'} variant={'body1'}>
        Are you sure you want to delete {userName}?
      </Typography>
      <div className={s.buttonsContainer}>
        <Button onClick={() => handleDeleteUser()}>Yes</Button>
        <Button onClick={onCloseModal}>No</Button>
      </div>
    </div>
  )
}
