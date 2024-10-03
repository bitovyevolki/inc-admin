import { useEffect, useState } from 'react'

import { ImagePost } from '@/src/gql/graphql'
import { useQuery } from '@apollo/client'

import { GET_UPLOADED_FILES } from '../../api/user.service'

const SCROLL_OFFSET = 5

interface IProps {
  userId: number
}

export const useUploadedFiles = ({ userId }: IProps) => {
  const [lastImageId, setLastImageId] = useState(0)
  const [combinedImages, setCombinedImages] = useState<Pick<ImagePost, 'id' | 'url'>[]>([])

  const { data, error, loading } = useQuery(GET_UPLOADED_FILES, {
    variables: { endCursorId: lastImageId, userId },
  })

  const images = data?.getPostsByUser.items

  const totalCount = data?.getPostsByUser.totalCount

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - SCROLL_OFFSET
    ) {
      if (combinedImages.length === totalCount) {
        return
      }

      let lastCombinedPostId

      if (combinedImages.length > 0) {
        lastCombinedPostId = combinedImages[combinedImages.length - 1].id
      }

      setLastImageId(lastCombinedPostId ?? 0)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [combinedImages])

  useEffect(() => {
    if (images && images.length > 0) {
      setCombinedImages(prev => [...prev, ...images])
    }
  }, [images])

  return { combinedImages, error, loading }
}
