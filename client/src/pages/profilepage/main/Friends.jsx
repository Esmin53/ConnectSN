import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom"

const Friends = () => {
  const currentUser = useSelector(state => state); 
  const [friends, setFriends] = useState([]);
  const location = useLocation()
  const userId = location.pathname.split("/")[2]
  const navigate = useNavigate()

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
    <div className='profile_friends_container'>
        <div className='profile_friends_header'>
          <div>
            <h2>Friends</h2>
            <p>501 friends</p>
          </div>
          <Link to={`/friends/${userId}`} className='friends_button center'>See all friends</Link>
        </div>
        <div className='profile_friends'>
            {friends?.map((item, index) => {
              if(index === 9) return
              return <div key={index}>  
                  <img src={item.profilePicture} className='profile_friend' />
                <p className='profile_friend_name'>{item.firstName} {item.lastName}</p>
              </div>
            })}                   
         </div>
    </div>
  )
}

export default Friends