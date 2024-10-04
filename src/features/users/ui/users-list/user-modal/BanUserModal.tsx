import { FC, useState } from 'react'

import { Button, Select, Typography } from '@bitovyevolki/ui-kit-int'

import s from './ViewUserModal.module.scss'

import { UserType } from '../../../model/types/users'

export type BanUserModalProps = {
  handleBanUser: (value: string) => void
  onCloseModal: () => void
  userName: string
}

export const BanUserModal: FC<BanUserModalProps> = ({ handleBanUser, onCloseModal, userName }) => {
  const [selectedReason, setSelectedReason] = useState<string>('bad_behavior')

  const handleSelectChange = (value: string) => {
    setSelectedReason(value)
  }

  return (
    <div className={s.card}>
      <Typography variant={'body2'}>Are you sure you want to ban this user {userName}? </Typography>
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
        value={selectedReason}
        variant={'large'}
      />
      <div className={s.buttonsContainer}>
        <Button
          onClick={() => {
            onCloseModal()
          }}
        >
          No
        </Button>
        <Button onClick={() => handleBanUser(selectedReason)} variant={'outlined'}>
          Yes
        </Button>
      </div>
    </div>
  )
}
