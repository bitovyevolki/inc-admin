import { FC, useState } from 'react'

import { Button, Select, Typography } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './ViewUserModal.module.scss'

import { UserType } from '../../../model/types/users'

export type BanUserModalProps = {
  handleBanUser: (value: string) => void
  onCloseModal: () => void
  userName: string
}

export const BanUserModal: FC<BanUserModalProps> = ({ handleBanUser, onCloseModal, userName }) => {
  const t = useTranslations('UsersTable')
  const [selectedReason, setSelectedReason] = useState<string>('bad_behavior')
  const options = [
    {
      label: t('Bad behavior'),
      value: 'bad_behavior',
    },
    {
      label: t('Advertising placement'),
      value: 'advertising_placement',
    },
    {
      label: t('Another reason'),
      value: 'another_reason',
    },
  ]
  const handleSelectChange = (value: string) => {
    setSelectedReason(value)
  }

  return (
    <div className={s.card}>
      <Typography variant={'body1'}>
        {t('Are you sure you want to ban user')} ${userName}?
      </Typography>
      <Select
        onChange={handleSelectChange}
        options={options}
        value={selectedReason}
        variant={'large'}
      />
      <div className={s.buttonsContainer}>
        <Button
          onClick={() => {
            onCloseModal()
          }}
        >
          {t('No')}
        </Button>
        <Button onClick={() => handleBanUser(selectedReason)} variant={'outlined'}>
          {t('Yes')}
        </Button>
      </div>
    </div>
  )
}
