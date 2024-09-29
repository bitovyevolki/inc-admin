import AvatarImage from '@/public/images/avatar.webp'
import { Scalars } from '@/src/gql/graphql'
import { getDateViewWithDots } from '@/src/shared/utils/date'
import { Typography } from '@bitovyevolki/ui-kit-int'
import { Maybe } from 'graphql/jsutils/Maybe'
import Image from 'next/image'

import s from './PersonalInfo.module.scss'

interface IProps {
  avatar?: Maybe<Scalars['String']['output']>
  createdAt: Date
  email?: string
  userId?: number
  userName?: string
}

export const PersonalInfo = ({ avatar, createdAt, email, userId, userName }: IProps) => {
  return (
    <div className={s.userInfo}>
      <div className={s.topBox}>
        <Image alt={'Avatar'} height={60} src={avatar || AvatarImage} width={60} />
        {userName && (
          <div>
            <Typography variant={'h2'}>{userName}</Typography>
            <Typography variant={'body2'}>{email}</Typography>
          </div>
        )}
      </div>
      <div className={s.bottomBox}>
        <div>
          <Typography className={s.greyText} variant={'body2'}>
            UserID
          </Typography>
          <Typography variant={'body1'}>{userId}</Typography>
        </div>
        <div>
          <Typography className={s.greyText} variant={'body2'}>
            Profile Creation Date
          </Typography>
          <Typography variant={'body1'}>{getDateViewWithDots(createdAt)}</Typography>
        </div>
      </div>
    </div>
  )
}
