import { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'

import { GET_UPLOADED_FILES } from '../../api/user.service'

const SCROLL_OFFSET = 5

interface IImage {
  id?: null | number
  url?: null | string
}

interface IProps {
  userId: number
}

export const useUploadedFiles = ({ userId }: IProps) => {
  const [lastImageId, setLastImageId] = useState(0)
  const [combinedImages, setCombinedImages] = useState<IImage[]>([])

  const { data, loading } = useQuery(GET_UPLOADED_FILES, {
    variables: { endCursorId: lastImageId, userId },
  })

  // @ts-ignore
  const images: IImage[] = data?.getPostsByUser.items

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

  return { combinedImages, loading }
}
