import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Link} from "react-router-dom"
import {FaUserClock, FaUserMinus, FaUserPlus} from "react-icons/fa"
import {useDispatch, useSelector} from "react-redux";
import { updateSentRequests } from '../../redux/rootSlice';
import { useNavigate } from 'react-router-dom';
import HpfriendsSkeleton from '../../components/loading/skeletons/HpfriendsSkeleton';

const Friends = () => {
  const [friends, setFriends] = useState();
  const currentUser = useSelector(state => state)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isFetching, setIsFetching] = useState(true)

  const getFriends = async () => {
    setIsFetching(true)
    try {
      const res = await axios.get(`http://localhost:3001/api/v1/user/getFriends/${currentUser.user._id}`,  {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      }) 
      setFriends(res.data)
      setIsFetching(false)
    } catch (error) {
      console.log(error)
    }
  }

  const addFriend = async (id) => {
    try {
      const res = await axios.post("http://localhost:3001/api/v1/user/request", {
        friendId: id
      }, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
      dispatch(updateSentRequests(res.data));
      getFriends();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFriends();
  }, [])

  if(isFetching) {
    return <HpfriendsSkeleton />
  }

  return (
    <ul className='friends'>
        <h3 className='fr'>My Friends</h3>
        {currentUser?.user?.friends?.length === 0 && <p className='no_friends_message'>Looks like there is nothing here! Try finding some people!</p>}

        {friends?.map((item, index) => {
          return <li className='friend_container' key={index}>
          <div className='friend'>
            <div className='profile_picture_container'>
              <img className='profile_picture' src={item.profilePicture} />
            </div>
            <div className='friend_info'>
              <p>{item.firstName} </p>
              <p>{item.lastName} </p>
          </div>
          </div>
          <div className={'center add_friend' }>
            {currentUser?.user?.friends?.includes(item._id) && <FaUserMinus onClick={() => addFriend(item._id)}/>}
            {!currentUser?.user?.friends?.includes(item._id) && <FaUserPlus onClick={() => addFriend(item._id)}/> }
          </div>
        </li>
        })}  
    </ul>
  )
}

export default Friends