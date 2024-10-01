/* eslint-disable no-nested-ternary */
import { useRef, useState } from 'react'

import { BlockIcon } from '@/src/shared/assets/icons'
import { Typography } from '@bitovyevolki/ui-kit-int'
import { ShowMore, ShowMoreRef } from '@re-dev/react-truncate'
import moment from 'moment'
import Image from 'next/image'
import { useLocale } from 'next-intl'

import 'moment/locale/ru'

import s from './Post.module.scss'

import { PostItem } from '../../model/types/post'
import { PhotoSlider } from '../PhotoSlider/PhotoSlider'

type Props = {
  post: PostItem
}

export const Post = ({ post }: Props) => {
  const [isSmalText, setIsSmallText] = useState(true)
  const ref = useRef<ShowMoreRef>(null)
  const locale = useLocale()
  const toggleLines = () => {
    setIsSmallText(prev => !prev)
  }

  const avatarUrl =
    post.postOwner.avatars && post.postOwner.avatars.length > 0
      ? post.postOwner.avatars[0].url
      : null

  const userName =
    post.postOwner.firstName && post.postOwner.lastName
      ? `${post.postOwner.firstName} ${post.postOwner.lastName}`
      : post.postOwner.userName

  moment.locale(locale)
  const date = moment(post.createdAt).fromNow()

  return (
    <div className={s.post}>
      {post.images && post.images.length > 0 ? (
        post.images.length > 1 ? (
          <PhotoSlider>
            {post.images.map((image, index) => (
              <div key={image.id}>
                <Image
                  alt={`post.image ${index}`}
                  height={isSmalText ? 240 : 120}
                  src={image.url as string}
                  width={234}
                />
              </div>
            ))}
          </PhotoSlider>
        ) : (
          <Image
            alt={'Post image'}
            height={isSmalText ? 240 : 120}
            src={post.images[0].url as string}
            width={234}
          />
        )
      ) : (
        <div className={s.image} style={{ height: `${isSmalText ? '240px' : '120px'}` }}>
          No images available
        </div>
      )}

      <div className={s.user}>
        <div className={s.userAvatarAndName}>
          {avatarUrl ? (
            <Image alt={'avatar'} className={s.avatar} height={36} src={avatarUrl} width={36} />
          ) : (
            <div className={s.withoutAvatar}>{userName.slice(0, 2)}</div>
          )}
          <Typography variant={'h4'}>
            {userName.slice(0, 18)}
            {userName.length > 18 ? '...' : ''}
          </Typography>
        </div>
        <BlockIcon />
      </div>

      <Typography className={s.date} variant={'caption'}>
        {date}
      </Typography>

      <Typography variant={'body2'}>
        <div className={s.description}>
          <ShowMore
            lines={isSmalText ? 3 : 8}
            more={
              <span onClick={toggleLines}>
                ... <span className={s.showMore}>{isSmalText ? 'Show more' : ' Hide'}</span>
              </span>
            }
            ref={ref}
          >
            {post.description}{' '}
          </ShowMore>
        </div>
      </Typography>
    </div>
  )
}
