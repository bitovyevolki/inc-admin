import { FC } from 'react'

import { Button, Typography } from '@bitovyevolki/ui-kit-int'

import s from './ViewUserModal.module.scss'

export type DeleteUserModalProps = {
  closeViewPostModalHandler: () => void
  handleDeleteUser: (userId: number) => void
  userId: number
}

export const DeleteUserModal: FC<DeleteUserModalProps> = ({
  closeViewPostModalHandler,
  handleDeleteUser,
  userId,
}) => {
  return (
    <div className={s.card}>
      <Typography as={'p'} variant={'body1'}>
        Are you sure you want to delete this post
      </Typography>
      <div className={s.buttonsContainer}>
        <Button onClick={() => handleDeleteUser(userId)}>Yes</Button>
        <Button onClick={closeViewPostModalHandler}>No</Button>
      </div>
    </div>
  )
}
