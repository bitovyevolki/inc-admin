import { FC } from 'react'

import { Button, Typography } from '@bitovyevolki/ui-kit-int'

import s from './ViewUserModal.module.scss'

import { UserType } from '../../../model/types/users'

export type UnBanUserModalProps = {
  handleUnbanUser: () => void
  onCloseModal: () => void
  userName: string
}

export const UnBanUserModal: FC<UnBanUserModalProps> = ({
  handleUnbanUser,
  onCloseModal,
  userName,
}) => {
  return (
    <div className={s.card}>
      <Typography as={'p'} variant={'body1'}>
        Are you sure you want to unban {userName}?
      </Typography>
      <div className={s.buttonsContainer}>
        <Button
          onClick={() => {
            handleUnbanUser()
          }}
        >
          Yes
        </Button>
        <Button onClick={() => onCloseModal()}>No</Button>
      </div>
    </div>
  )
}
