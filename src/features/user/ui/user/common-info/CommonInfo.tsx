import { useState } from 'react'

import { IOption, Tabs } from '@bitovyevolki/ui-kit-int'

import s from './CommonInfo.module.scss'

import { UserContentType } from '../../../model/types/user'
import { UploadedFiles } from './uploaded-files/UploadedFiles'

interface IProps {
  userId: number
}

export const CommonInfo = ({ userId }: IProps) => {
  const [contentType, setContentType] = useState<UserContentType>(UserContentType.UPLOADED)

  const tabsOptions: ({ disabled: boolean } & IOption)[] = [
    { disabled: false, label: 'Uploaded files', value: UserContentType.UPLOADED },
    { disabled: false, label: 'Payments', value: UserContentType.PAYMENTS },
    { disabled: false, label: 'Followers', value: UserContentType.FOLLOWERS },
    { disabled: false, label: 'Following', value: UserContentType.FOLLOWING },
  ]

  const changeContentTypeHandler = (type: UserContentType | string) => {
    setContentType(type as UserContentType)
  }

  return (
    <div className={s.commonInfo}>
      <div className={s.tabs}>
        <Tabs onChange={changeContentTypeHandler} options={tabsOptions} value={contentType}></Tabs>
      </div>
      {contentType === UserContentType.UPLOADED && <UploadedFiles userId={userId} />}
      {contentType === UserContentType.PAYMENTS && <>payments</>}
      {contentType === UserContentType.FOLLOWERS && <>followers</>}
      {contentType === UserContentType.FOLLOWING && <>following</>}
    </div>
  )
}
