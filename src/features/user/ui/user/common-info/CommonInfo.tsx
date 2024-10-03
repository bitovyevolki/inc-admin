import { useState } from 'react'

import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { IOption, Tabs } from '@bitovyevolki/ui-kit-int'
import { useTranslations } from 'next-intl'

import s from './CommonInfo.module.scss'

import { UserContentType } from '../../../model/types/user'
import { Followers } from './followers/Followers'
import { Following } from './following/Following'
import { Payments } from './payments/Payments'
import { UploadedFiles } from './uploaded-files/UploadedFiles'

interface IProps {
  userId: number
}

export const CommonInfo = ({ userId }: IProps) => {
  const t = useTranslations('UserPage')

  const { changeQueryHandler, searchParams } = useParamsHook()

  const contentType = searchParams.get('cont') ?? UserContentType.UPLOADED

  const tabsOptions: ({ disabled: boolean } & IOption)[] = [
    { disabled: false, label: `${t('uploaded')} `, value: UserContentType.UPLOADED },
    { disabled: false, label: `${t('payments')} `, value: UserContentType.PAYMENTS },
    { disabled: false, label: `${t('followers')} `, value: UserContentType.FOLLOWERS },
    { disabled: false, label: `${t('following')} `, value: UserContentType.FOLLOWING },
  ]

  const changeContentTypeHandler = (type: UserContentType | string) => {
    changeQueryHandler({ cont: type })
  }

  return (
    <div className={s.commonInfo}>
      <div className={s.tabs}>
        <Tabs onChange={changeContentTypeHandler} options={tabsOptions} value={contentType}></Tabs>
      </div>
      {contentType === UserContentType.UPLOADED && <UploadedFiles userId={userId} />}
      {contentType === UserContentType.PAYMENTS && <Payments userId={userId} />}
      {contentType === UserContentType.FOLLOWERS && <Followers userId={userId} />}
      {contentType === UserContentType.FOLLOWING && <Following userId={userId} />}
    </div>
  )
}
