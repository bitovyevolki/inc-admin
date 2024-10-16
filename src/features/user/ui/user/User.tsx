'use client'
import { ArrowBackIcon } from '@/src/shared/assets/icons'
import { useQuery } from '@apollo/client'
import { Button, Typography } from '@bitovyevolki/ui-kit-int'
import { useParams, useSearchParams } from 'next/navigation'
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
  const searchParams = useSearchParams()
  const fromUrl = searchParams.get('from') || '/posts'
  const { data } = useQuery(GET_USER, { variables: { userId: Number(userId) ?? '' } })
  const backHandler = () => {
    router.push(fromUrl)
  }

  const userData = data?.getUser

  const avatar =
    userData?.profile.avatars && userData?.profile.avatars.length > 0
      ? userData?.profile?.avatars[0].url
      : ''

  return (
    <div className={s.user}>
      <div className={s.main}>
        <Button className={s.backArrowBox} onClick={backHandler} variant={'ghost'}>
          <ArrowBackIcon />
          <Typography variant={'body1'}>{t('to-previous-page')}</Typography>
        </Button>
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
