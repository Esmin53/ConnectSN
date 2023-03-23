import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Link} from "react-router-dom"
import {FaUserClock, FaUserMinus, FaUserPlus} from "react-icons/fa"
import {useDispatch, useSelector} from "react-redux";
import { updateSentRequests } from '../../redux/rootSlice';
import { useNavigate } from 'react-router-dom';

const Friends = () => {
  const [users, setUsers] = useState();
  const [friends, setFriends] = useState();
  const currentUser = useSelector(state => state)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/v1/user/getAllUsers") 
      setUsers(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getFriends = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/v1/user/getFriends/${currentUser.user._id}`,  {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      }) 
      console.log(res.data)
      setFriends(res.data)
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
    fetchAllUsers();
  }, [])

  useEffect(() => {
    getFriends();
  }, [currentUser.user.friends])

  return (
    <ul className='friends'>
        <h3 className='fr'>My Friends</h3>
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
        
        <div className='line'></div>
        
        {users?.map((item, index) => {
          return <li className='friend_container' key={index} >
          <Link to={`/profile/${item._id}`} className='friend'>
            <div className='profile_picture_container'>
              <img className='profile_picture' src={item.profilePicture} />
            </div>
            <div className='friend_info'>
              <p>{item.firstName} </p>
              <p>{item.lastName} </p>
          </div>
          </Link>
          <div className={'center add_friend' }>
            {currentUser?.user?.friends?.includes(item._id) && <FaUserMinus onClick={() => addFriend(item._id)}/>}
            {!currentUser?.user?.friends?.includes(item._id) &&
             !currentUser?.user?.sentRequests?.includes(item._id) && <FaUserPlus onClick={() => addFriend(item._id)}/> }
            {currentUser?.user?.sentRequests?.includes(item._id) && <FaUserClock />}
          </div>
        </li>
        })}
        
    </ul>
  )
}

export default Friends