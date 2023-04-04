import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Post from '../../components/post/postcomponent/Post'

const Posts = () => {
  const currentUser = useSelector(state => state)

  const [allPosts, setAllPosts] = useState([])

  const getPosts = async (url) => {
    try {
      const res = await axios.get("http://localhost:3001/api/v1/post/homepage", {
            headers: {
              Authorization: `Bearer ${currentUser.token}`
            }
          }
      )
      console.log(res)
      setAllPosts(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  const array = allPosts?.map((item, index) => {
    return <Post key={index} {...item} />
  })

  return (
    <div className='posts_container'>
       {array}
       {array.length === 0 && <p className='no_posts_message'>For you page seems empty, try adding some friends!</p>}
    </div>
  )
}

export default Posts