import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import "./friends.css"
import axios from "axios"
import {AiOutlineArrowLeft} from "react-icons/ai"

const Friends = () => {
  const currentUser = useSelector(state => state); 
  const [friends, setFriends] = useState([]);
  const location = useLocation()
  const userId = location.pathname.split("/")[2]

  const getFriends = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/v1/user/getFriends/${userId}`,  {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      }) 
      setFriends(res.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFriends();
  }, [])



  return (
    <div className='friends_page_container'>
    <div className='friends_page_header'>
        My Friends
        <Link to={`/profile/${userId}`} className='exit_friends_page center'>
            <AiOutlineArrowLeft />
        </Link>
    </div>
        {friends?.map((item, index) => {
            return <div key={index} className="friends_page_item"> 
                <Link to={`/profile/${item._id}`} className="friends_page_profile_picture">
                    <img className='friends_page_profile_picture' src={item.profilePicture} />
                </Link>
                <p className='profile_page_friend_name'>{item.firstName} {item.lastName}</p>
            </div>
        })}
    </div>
  )
}

export default Friends