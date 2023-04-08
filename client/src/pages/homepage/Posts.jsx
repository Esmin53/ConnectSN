import axios from 'axios'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Post from '../../components/post/postcomponent/Post'

const Posts = () => {
  const currentUser = useSelector(state => state)
  const [allPosts, setAllPosts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const[page, setPage] = useState(1)
  const observer = useRef()
  const lastUserElementRef = useCallback(node => {
    if(isLoading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore != allPosts.length) {
        setPage(prev => prev + 1)
      }
    })

    if(node) observer.current.observe(node)
  }, [isLoading, hasMore])

  const getPosts = async (url) => {
    console.log(page)
    setIsLoading(true)
    try {
      const res = await axios.get(`http://localhost:3001/api/v1/post/homepage?pagenum=${page}`, {
            headers: {
              Authorization: `Bearer ${currentUser.token}`
            }
          }
      )
      setAllPosts(res.data.posts)
      setHasMore(res.data.count)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPosts()
  }, [page])

  if(!allPosts) {
    return <p></p>
  }

  return (
    <div className='posts_container'>
       {allPosts?.map((item, index) => {
        if(allPosts?.length === index + 1) {
          return <span ref={lastUserElementRef}><Post key={index} {...item} /></span>
        } else { 
          return <Post key={index} {...item} />
        }
  })}
       {allPosts?.length === 0 && <p className='no_posts_message'>For you page seems empty, try adding some friends!</p>}
    </div>
  )
}

export default Posts