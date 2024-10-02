import { FC, ReactNode, useState } from 'react'

import { Button, Select, Typography } from '@bitovyevolki/ui-kit-int'

import s from './ViewUserModal.module.scss'
import { BAN_USERS } from '../../../api/userban'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'

export type BanUserModalProps = {
  closeBanUserModalHandler: () => void
  userId: number
  refetch: () => void
}

export const ViewBanModal: FC<BanUserModalProps> = ({
  closeBanUserModalHandler,
  userId,
  refetch,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('bad_behavior')

  const handleSelectChange = (value: string) => {
    setSelectedReason(value)
  }

  const [banUser] = useMutation<{ banUser: boolean }, { banReason: string; userId: number }>(
    BAN_USERS
  )

  const handleBanUser = async () => {
    try {
      await banUser({ variables: { banReason: selectedReason, userId } })
      toast.success('User banned successfully', { position: 'top-right' })
      closeBanUserModalHandler()
      refetch()
    } catch (error) {
      toast.error('Failed to ban user', { position: 'top-right' })
    }
  }

  return (
    <div className={s.card}>
      <Typography variant={'body2'}>Are you sure you want to ban this user? </Typography>
      <Select
        onChange={handleSelectChange}
        options={[
          {
            label: 'Bad behavior',
            value: 'bad_behavior',
          },
          {
            label: 'Advertising placement',
            value: 'advertising_placement',
          },
          {
            label: 'Another reason',
            value: 'another_reason',
          },
        ]}
        variant={'large'}
        value={selectedReason}
      />
      <div className={s.buttonsContainer}>
        <Button
          onClick={() => {
            closeBanUserModalHandler()
          }}
        >
          No
        </Button>
        <Button onClick={handleBanUser} variant={'outlined'}>
          Yes
        </Button>
      </div>
    </div>
  )
}
