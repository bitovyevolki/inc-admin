import { FC, ReactNode, useState } from 'react'

import { Button, Select, Typography } from '@bitovyevolki/ui-kit-int'

import s from './ViewUserModal.module.scss'

export type BanUserModalProps = {
  closeBanUserModalHandler: () => void
}

export const ViewBanModal: FC<BanUserModalProps> = ({ closeBanUserModalHandler }) => {
  const [selectedReason, setSelectedReason] = useState<string>('bad_behavior')

  const handleSelectChange = (value: string) => {
    setSelectedReason(value)
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
        <Button onClick={() => {}} variant={'outlined'}>
          Yes
        </Button>
      </div>
    </div>
  )
}
