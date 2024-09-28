'use client'

import { ArrowBackIcon } from '@/src/shared/assets/icons'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { useQuery } from '@apollo/client'
import { Typography } from '@bitovyevolki/ui-kit-int'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

import s from './User.module.scss'

import { GET_USER } from '../../api/user.service'
import { CommonInfo } from './common-info/CommonInfo'
import { PersonalInfo } from './personal-info/PersonalInfo'

export const User = () => {
  const router = useRouter()
  const params = useParams<{ userId: string }>()

  const backHandler = () => {
    router.back()
  }

  const userId = params?.userId

  const { data } = useQuery(GET_USER, { variables: { userId: Number(userId) ?? '' } })

  const userData = data?.getUser

  return (
    <div className={s.user}>
      <div className={s.emptyBox}></div>
      <div className={s.main}>
        <div className={s.backArrowBox} onClick={backHandler}>
          <ArrowBackIcon />
          <Typography variant={'body1'}>Back to Users List</Typography>
        </div>
        <PersonalInfo
          // @ts-ignore
          avatar={userData?.profile?.avatars[0]?.url as string}
          createdAt={userData?.createdAt}
          email={userData?.email}
          userId={userData?.id}
          userName={userData?.userName}
        />
        <CommonInfo userId={Number(userId)} />
      </div>
    </div>
  )
}
