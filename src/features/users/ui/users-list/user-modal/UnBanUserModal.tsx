import { FC } from 'react'
import { toast } from 'react-toastify'

import { useMutation } from '@apollo/client'
import { Button, Typography } from '@bitovyevolki/ui-kit-int'

import s from './ViewUserModal.module.scss'

import { UNBAN_USER } from '../../../api/user.unban'

export type UnBanUserModalProps = {
  closeUnBanUserModalHandler: () => void
  refetch: () => void
  userId: number
}

export const UnBanUserModal: FC<UnBanUserModalProps> = ({
  closeUnBanUserModalHandler,
  refetch,
  userId,
}) => {
  const [unbanUser] = useMutation<{ unbanUser: boolean }, { userId: number }>(UNBAN_USER)

  const handleUnbanUser = async () => {
    try {
      await unbanUser({ variables: { userId } })
      toast.success('User unbanned successfully', { position: 'top-right' })
      closeUnBanUserModalHandler()
      refetch()
    } catch (error) {
      toast.error('Failed to unban user', { position: 'top-right' })
    }
  }

  return (
    <div className={s.card}>
      <Typography as={'p'} variant={'body1'}>
        Are you sure you want to unban this user?
      </Typography>
      <div className={s.buttonsContainer}>
        <Button
          onClick={() => {
            handleUnbanUser()
          }}
        >
          Yes
        </Button>
        <Button onClick={() => closeUnBanUserModalHandler()}>No</Button>
      </div>
    </div>
  )
}
