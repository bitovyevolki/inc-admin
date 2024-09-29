import { useUploadedFiles } from '@/src/features/user/lib/hooks/useUploadedFiles'
import { RoundLoader } from '@/src/shared/ui/RouterLoader/RoundLoader'
import { Typography } from '@bitovyevolki/ui-kit-int'
import Image from 'next/image'

import s from './UploadedFiles.module.scss'

interface IProps {
  userId: number
}

export const UploadedFiles = ({ userId }: IProps) => {
  const { combinedImages, loading } = useUploadedFiles({ userId })

  const isHasImages = combinedImages && combinedImages.length > 0

  if (loading && !isHasImages) {
    return (
      <div className={s.loader}>
        <RoundLoader variant={'large'} />
      </div>
    )
  }

  if (!isHasImages) {
    return <Typography variant={'h2'}>The user does not have any publications yet</Typography>
  }

  return (
    <div className={s.uploadedFiles}>
      <div className={s.images}>
        {isHasImages &&
          combinedImages.map(img => (
            <div className={s.image} key={img.id}>
              <Image alt={'post image'} fill src={img.url as string} />
            </div>
          ))}
        {loading && (
          <div className={s.loader}>
            <RoundLoader variant={'large'} />
          </div>
        )}
      </div>
    </div>
  )
}
