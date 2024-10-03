'use client'

import { ArrowBackIcon } from '@/src/shared/assets/icons'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { useQuery } from '@apollo/client'
import { Typography } from '@bitovyevolki/ui-kit-int'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

import s from './User.module.scss'

import { GET_USER } from '../../api/user.service'
import { CommonInfo } from './common-info/CommonInfo'
import { PersonalInfo } from './personal-info/PersonalInfo'

export const User = () => {
  const t = useTranslations('UserPage')
  const router = useRouter()
  const { userId } = useParams<{ userId: string }>()

  const { data } = useQuery(GET_USER, { variables: { userId: Number(userId) ?? '' } })

  const backHandler = () => {
    router.push(RouterPaths.USERS)
  }

  const userData = data?.getUser

  const avatar =
    userData?.profile.avatars && userData?.profile.avatars.length > 0
      ? userData?.profile?.avatars[0].url
      : ''

  return (
    <div className={s.user}>
      <div className={s.emptyBox}></div>
      <div className={s.main}>
        <div className={s.backArrowBox} onClick={backHandler}>
          <ArrowBackIcon />
          <Typography variant={'body1'}>{t('to-users-list')}</Typography>
        </div>
        <PersonalInfo
          avatar={avatar}
          createdAt={userData?.createdAt}
          userId={userData?.id}
          userName={userData?.userName}
        />
        <CommonInfo userId={Number(userId)} />
      </div>
    </div>
  )
}
