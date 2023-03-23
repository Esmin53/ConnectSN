import React, { useEffect, useState } from 'react'
import "./profilepage.css"
import {MdPhotoCamera, MdModeEditOutline} from "react-icons/md"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Profilepicture from '../../components/edit/profilepicture/Profilepicture'
import Background from '../../components/edit/backgroundimage/Background'
import Personalinfo from '../../components/edit/personalinfo/Personalinfo'

const Profilepagetop = () => {
  const location = useLocation()
  const userId = location.pathname.split("/")[2]
  const currentUser = useSelector(state => state)
  const [user, setUser] = useState()
  const [isFetching, setIsFetching] = useState(true)
  


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
  
  useEffect(() => {
    getUser()
  }, [currentUser.user])
  
  if(isFetching) {
    return <div className='profile_page_container'>
      <div className='profile_page_top'>
        <div className='background'></div>
        <div className='profile_page_info'>
          <div className='main_profile_picture'></div>
        </div>
      </div>
    </div>
  }
  
  return (
        <div className='profile_page_container'>
          
      <div className='profile_page_top'>
        <div className='background'>
          {user.backgroundImage && <img src={user.backgroundImage} className="background_image"/>}
          
          {userId === currentUser.user._id && <button className='add_background'>
        <MdPhotoCamera /> <Background />
        <p style={{fontSize: "1rem"}} id="add_background_text">New background image</p>
    </button>}
        </div>
        <div className='profile_page_info'>
          <div style={{position: "relative"}}>
            <img className='main_profile_picture' src={user.profilePicture} />
            {userId === currentUser.user._id && <div className='new_profile_picture'>
              <Profilepicture />
              <MdPhotoCamera />
          </div>}
          </div>
          <div className='profile_info_flex'>
            <div>
              <h4>{user.firstName} {user.lastName}</h4>
              <p id="display_none">501 friends</p>
            </div>
              {userId === currentUser.user._id ? <Personalinfo /> : <button className='edit_profile_button'> Friends </button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profilepagetop