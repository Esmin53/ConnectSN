import React, { useEffect, useState } from 'react'
import ".././profilepage.css"
import "./profilepagemain.css"
import Newpost from '../../../components/post/newpost/Newpost'
import Userinfo from './Userinfo'
import Friends from './Friends'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Posts from "./Posts"

const Profilepagemain = () => {
  const location = useLocation()
  const userId = location.pathname.split("/")[2]
  const currentUser = useSelector(state => state)
  const [user, setUser] = useState()
  const [isFetching, setIsFetching] = useState(true)

  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/v1/user/info/${userId}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
      setUser(res.data)
      setIsFetching(false)
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getUser()
  }, [userId, currentUser.user])
  
  if(isFetching) {
    return <div className='profile_page_main'></div>
  }


  return (
    <div className='profile_page_main'>
        <div className='profile_main_left'>
            <Userinfo user={user}/>
            <Friends friends={user.friends}/>
        </div>
        <div className='profile_main_right'>
            {userId === currentUser.user._id ? <Newpost /> : <div className='newpost_placeholder center'> <p>Posts</p> </div>}
            <Posts userId={userId}/>
        </div>
    </div>
  )
}

export default Profilepagemain