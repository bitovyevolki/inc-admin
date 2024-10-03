import { ChangeEvent, useEffect, useState } from 'react'

import { useParamsHook } from '@/src/shared/hooks/useParamsHook'
import { useQuery } from '@apollo/client'
import { Input } from '@bitovyevolki/ui-kit-int'

import s from './Posts.module.scss'

import { GET_ALL_POSTS } from '../api/posts.service'
import { PostItem } from '../model/types/post'
import { Post } from './Post/Post'

export const Posts = () => {
  const { changeQueryHandler, searchParams } = useParamsHook()
  const searchTerm = searchParams.get('searchTerm')
  const [endCursorPostId, setEndCursorPostId] = useState(0)

  const [filterValue, setFilterValue] = useState(searchTerm)
  const { data, loading } = useQuery(GET_ALL_POSTS, {
    variables: { endCursorPostId, searchTerm },
  })

  const [posts, setPosts] = useState<PostItem[]>([])

  useEffect(() => {
    setPosts([])
    setEndCursorPostId(0)
  }, [searchTerm])

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (filterValue !== null) {
        changeQueryHandler({ searchTerm: filterValue })
      }
    }, 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [filterValue])

  useEffect(() => {
    if (data && data?.getPosts?.items.length > 0) {
      setPosts(prevPosts => [...prevPosts, ...data.getPosts.items])
    }
  }, [data])

  useEffect(() => {
    if (loading) {
      return
    }
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 && !loading) {
        const lastPostId = posts[posts.length - 1].id

        setEndCursorPostId(lastPostId)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading, posts])

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.currentTarget.value)
  }

  return (
    <div className={s.container}>
      <div className={s.search}>
        <Input
          className={s.input}
          onChange={onChangeInput}
          placeholder={'Search'}
          type={'search'}
          value={filterValue || ''}
        />
      </div>
      <div className={s.posts}>
        {posts.map(el => (
          <Post key={el.id} post={el} />
        ))}
      </div>
      {loading && <div className={s.loading}>Loading...</div>}
    </div>
  )
}
