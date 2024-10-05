import { FC } from 'react'

import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('UsersTable')

  return (
    <div className={s.card}>
      <Typography as={'p'} variant={'body1'}>
        {t('Are you sure you want to delete')} {userName}?
      </Typography>
      <div className={s.buttonsContainer}>
        <Button onClick={() => handleDeleteUser()}>{t('Yes')}</Button>
        <Button onClick={onCloseModal}>{t('No')}</Button>
      </div>
    </div>
  )
}
