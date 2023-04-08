import React, { useEffect, useState } from 'react';
import "./profilepage.css";
import {MdPhotoCamera, MdModeEditOutline, MdKeyboardArrowDown} from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Profilepicture from '../../components/edit/profilepicture/Profilepicture';
import Background from '../../components/edit/backgroundimage/Background';
import Personalinfo from '../../components/edit/personalinfo/Personalinfo';
import { updateFriends, updateSentRequests, updateRequsets } from '../../redux/rootSlice';
import { FaUserClock, FaUserPlus } from 'react-icons/fa';
import Loading from '../../components/loading/Loading';

const Profilepagetop = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const userId = location.pathname.split("/")[2];
  const currentUser = useSelector(state => state);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isRemoveFriendOpen, setIsRemoveFriendOpen] = useState(false);
  
  const getUser = async () => {
    setIsFetching(true)
    try {
      const res = await axios.get(`http://localhost:3001/api/v1/user/info/${userId}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
      setUser(res.data)
      setIsFetching(false)
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error)
    }
  }

  const removeFriend = async () => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/v1/user/remove/${userId}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
      dispatch(updateFriends(res.data))
    } catch (error) {
      console.log(error)
    }
  }

  const responseRequest = async () => {
    try {
        const res = await axios.post("http://localhost:3001/api/v1/user/answerRequest", {
            friendId: userId,
            response: true
        }, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            }
        })
        dispatch(updateFriends(res.data.friends))
        dispatch(updateRequsets(res.data.recievedRequests))
        //getRequests();
    } catch (error) {
       console.log(error.response.data)
    }
}

  useEffect(() => {
    getUser()
  }, [currentUser.user])
  
  if(!user) {
    return <Loading />
  }
  
  return (
    <div className='profile_page_top_container'>
        <div className='profile_page_background_image_area'>
        {user?.backgroundImage && <img src={user?.backgroundImage} className="profile_page_background_image"/>}
        {userId === currentUser.user._id && <button className='add_background'>
            <MdPhotoCamera /> <Background />
            <p style={{fontSize: "1rem"}} id="add_background_text">New background image</p>
        </button>} 
        </div>
        <div className='profile_page_user_info' >
            <div className='main_profile_picture_container'>
              <img className='main_profile_picture' src={user.profilePicture} />
                {userId === currentUser.user._id && <div className='new_profile_picture'>
                <Profilepicture />  <MdPhotoCamera />
              </div>}
              
            </div> 
            <div className='profile_info_flex'>
            <div className='profile_info_flex_left'>
                    <p className='profile_page_user_name'>{user.firstName} {user.lastName}</p> 
                    <p className='profile_info_friends'>{user?.friends?.length} friends</p>  
                </div> 
              {userId === currentUser?.user?._id && <Personalinfo />}
              {userId !== currentUser?.user?._id && <div> 
                {currentUser.user.friends.includes(userId) ? 
                <button className='profile_page_friend_button center' onClick={() => setIsRemoveFriendOpen(prev => !prev)}
                >Remove friend
                {isRemoveFriendOpen && 
                  <div className='dropdown' id='remove_friend_dropdown'>
                    <p className='friend_button_text'>Are you sure you want to remove {user?.firstName} from friends?</p>
                    <p className='friend_button_options'>
                      <button onClick={removeFriend}>Yes</button>
                      <button id='delete_button'>No</button>
                    </p>
                  </div>
                }
                </button> : 
                <button className='profile_page_friend_button center'>
                  {currentUser?.user?.sentRequests?.includes(userId) ? <span onClick={() => setIsRemoveFriendOpen(prev => !prev)}>
                    Sent <FaUserClock /> 
                      {isRemoveFriendOpen && <div className='dropdown' id='remove_friend_dropdown'>
                      <p className='friend_button_text'>Cancle friend request?</p>
                    <p className='friend_button_options'>
                      <button onClick={() => addFriend(userId)}>Yes</button>
                      <button id='delete_button'>No</button>
                    </p>
                      </div>}
                    </span> :<span>
                    { currentUser?.user.recievedRequests?.includes(userId) ?
                    <span onClick={responseRequest}> Accept <FaUserClock /></span> :
                    <span onClick={() => addFriend(userId)}>Send request <FaUserPlus /></span>}
                    </span>}
                </button>}  
              </div>}
            </div>   
        </div>
    </div>
  )
}

export default Profilepagetop