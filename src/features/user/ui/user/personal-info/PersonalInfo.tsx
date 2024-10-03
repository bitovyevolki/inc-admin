import AvatarImage from '@/public/images/avatar.webp'
import { Scalars } from '@/src/gql/graphql'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { getDateViewWithDots } from '@/src/shared/utils/date'
import { Typography } from '@bitovyevolki/ui-kit-int'
import { Maybe } from 'graphql/jsutils/Maybe'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import s from './PersonalInfo.module.scss'

interface IProps {
  avatar?: Maybe<Scalars['String']['output']>
  createdAt: Date
  userId?: number
  userName?: string
}

export const PersonalInfo = ({ avatar, createdAt, userId, userName }: IProps) => {
  const t = useTranslations('UserPage')

  return (
    <div className={s.userInfo}>
      <div className={s.topBox}>
        <Image alt={'Avatar'} height={60} src={avatar || AvatarImage} width={60} />
        {userName && (
          <div>
            <Typography variant={'h2'}>{userName}</Typography>
            <Typography variant={'body2'}>
              <Link className={s.userLink} href={`${RouterPaths.PUBLIC_USER}/${userId}`}>
                {userName}
              </Link>
            </Typography>
          </div>
        )}
      </div>
      <div className={s.bottomBox}>
        <div>
          <Typography className={s.greyText} variant={'body2'}>
            {t('id')}
          </Typography>
          <Typography variant={'body1'}>{userId}</Typography>
        </div>
        <div>
          <Typography className={s.greyText} variant={'body2'}>
            {t('creation-date')}
          </Typography>
          <Typography variant={'body1'}>{getDateViewWithDots(createdAt)}</Typography>
        </div>
      </div>
    </div>
  )
}
