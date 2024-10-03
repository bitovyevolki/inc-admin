/* eslint-disable no-nested-ternary */
import { useRef, useState } from 'react'

import { ViewBanModal } from '@/src/features/users/ui/users-list/user-modal/ViewBanModal'
import { BlockIcon } from '@/src/shared/assets/icons'
import { RouterPaths } from '@/src/shared/config/router.paths'
import { ModalWindow, Typography } from '@bitovyevolki/ui-kit-int'
import { ShowMore, ShowMoreRef } from '@re-dev/react-truncate'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'

import 'moment/locale/ru'

import s from './Post.module.scss'

import { PostItem } from '../../model/types/post'
import { PhotoSlider } from '../PhotoSlider/PhotoSlider'

type Props = {
  post: PostItem
  refetch: () => void
}

export const Post = ({ post, refetch }: Props) => {
  const [isSmalText, setIsSmallText] = useState(true)
  const ref = useRef<ShowMoreRef>(null)
  const locale = useLocale()
  const toggleLines = () => {
    setIsSmallText(prev => !prev)
  }
  const [isOpenBanModal, setIsOpenBanModal] = useState(false)

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
        <Link className={s.userAvatarAndName} href={`${RouterPaths.USER}/${post.postOwner.id}`}>
          {avatarUrl ? (
            <Image alt={'avatar'} className={s.avatar} height={36} src={avatarUrl} width={36} />
          ) : (
            <div className={s.withoutAvatar}>{userName.slice(0, 2)}</div>
          )}
          <Typography variant={'h4'}>
            {userName.slice(0, 18)}
            {userName.length > 18 ? '...' : ''}
          </Typography>
        </Link>
        <div className={s.blockUnblockIcon} onClick={() => setIsOpenBanModal(true)}>
          <BlockIcon />
        </div>
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

      <ModalWindow
        className={s.modal}
        onOpenChange={setIsOpenBanModal}
        open={isOpenBanModal}
        title={'Ban'}
      >
        {true && (
          <ViewBanModal
            closeBanUserModalHandler={() => setIsOpenBanModal(false)}
            refetch={refetch}
            userId={post.postOwner.id}
            userName={post.postOwner.userName}
          />
        )}
      </ModalWindow>
    </div>
  )
}
