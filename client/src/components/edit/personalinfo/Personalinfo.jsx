import React, { useState } from 'react';
import "./personalinfo.css";
import { useSelector, useDispatch } from 'react-redux';
import {BiRefresh} from "react-icons/bi";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import {MdEdit} from "react-icons/md"
import axios from 'axios';
import Loading from '../../loading/Loading';
import {FaTrash} from "react-icons/fa";
import Userinfo from '../../../pages/homepage/Userinfo';
import { updateUserInfo } from '../../../redux/rootSlice';
import { useLocation } from 'react-router-dom';

const Personalinfo = () => {
  const currentUser = useSelector(state => state);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const path = useLocation()
  const page = path.pathname.split("/")[1]
  const [userInfo, setUserInfo] = useState({
    firstName: currentUser.user.firstName,
    lastName: currentUser.user.lastName,
    location: currentUser.user.location,
    occupation: currentUser.user.occupation,
    instagram: currentUser.user.instagram,
    facebook: currentUser.user.facebook,
    linkedin: currentUser.user.linkedin
  });
  
  const handleChange = (e) => {
    const value = e.target.value
    setUserInfo({
      ...userInfo,
      [e.target.name]: value
    })
  }

  console.log(page)

  const updateUser = async (e) => {
      e.preventDefault()
      setIsLoading(true)  
      try {
        const res = await axios.patch("http://localhost:3001/api/v1/user/update", 
          {
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
              location: userInfo.location,
              occupation: userInfo.occupation,
              instagram: userInfo.instagram,
              facebook: userInfo.facebook
          }, {
            headers: {
              Authorization: `Bearer ${currentUser.token}`
            }
          }
        )
        dispatch(updateUserInfo(res.data))
        setIsLoading(false)
        
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
      e.preventDefault()
    }

  return (
    <>
    <button className='edit_profile_button' onClick={() => setIsOpen(true)} id={page === 'home' && "homepage_edit_button"}
    style={{"backgroundColor": `${page === 'home' ? "#145DA0" : "#383838"}`}}>
      <MdEdit /> <span className='disapear'>Edit profile</span>
    </button>

    {isOpen && <div className='personal_info_container'>
          
        {isLoading && <Loading />}
        <form className='personal_info_form' onSubmit={handleSubmit}>
          <div className='personal_info_header'>
            <p>Edit profile</p>
            <p className='close_profile_picture center'
            onClick={() => setIsOpen(false)}><AiOutlineArrowLeft />
          </p>
          </div>
          <div className='personal_info_flex'>
            <input type="text" className='edit_info_input' placeholder={currentUser.user.firstName}
            name="firstName" value={userInfo.firstName} onChange={(e) => handleChange(e)}/>
            <div className='edit_info_button center'
            onClick={() => setUserInfo({...Userinfo, firstName: currentUser.user.firstName})}> <BiRefresh /></div>
          </div>
          <div className='personal_info_flex'>
            <input type="text" className='edit_info_input' placeholder={currentUser.user.lastName}
            name="lastName" value={userInfo.lastName} onChange={(e) => handleChange(e)}/>
            <div className='edit_info_button center'
            onClick={() => setUserInfo({...Userinfo, lastName: currentUser.user.lastName})}> <BiRefresh /></div>
          </div>    
          <div className='personal_info_flex'>
            <input type="text" className='edit_info_input' placeholder={currentUser.user.location|| "Location(not provided)"}
            name="location" value={userInfo.location} onChange={(e) => handleChange(e)}/>
            <div className='edit_info_button_trash center'
            onClick={() => setUserInfo({...Userinfo, location: ""})}> <FaTrash /></div>
            <div className='edit_info_button center' 
             onClick={() => setUserInfo({...Userinfo, location: currentUser.user.location})}> <BiRefresh /></div>
          </div>
          <div className='personal_info_flex'>
             <input type="text" className='edit_info_input' placeholder={currentUser.user.occupation || "Occupation(not provided)"}
            name="occupation" value={userInfo.occupation} onChange={(e) => handleChange(e)}/>
              <div className='edit_info_button_trash center'
               onClick={() => setUserInfo({...Userinfo, occupation: ""})}> <FaTrash /></div>
              <div className='edit_info_button center'
               onClick={() => setUserInfo({...Userinfo, occupation: currentUser.user.occupation})}> <BiRefresh /></div>
          </div>
          <div className='personal_info_flex'>
            <input type="text" className='edit_info_input' placeholder={currentUser.user.instagram || "Instagram(not provided)"}
            name="instagram" value={userInfo.instagram} onChange={(e) => handleChange(e)}/>
             <div className='edit_info_button_trash center'
              onClick={() => setUserInfo({...Userinfo, instagram: ""})}> <FaTrash /></div>
            <div className='edit_info_button center'
             onClick={() => setUserInfo({...Userinfo, instagram: currentUser.user.instagram || ""})}> <BiRefresh /></div>
          </div>
          <div className='personal_info_flex'>
            <input type="text" className='edit_info_input' placeholder={currentUser.user.facebook || "Facebook(not provided)"}
            name="facebook" value={userInfo.facebook} onChange={(e) => handleChange(e)}/>
            <div className='edit_info_button_trash center' 
             onClick={() => setUserInfo({...Userinfo, facebook: ""})}> <FaTrash /></div>
            <div className='edit_info_button center'
             onClick={() => setUserInfo({...Userinfo, facebook: currentUser.user.facebook})}> <BiRefresh /></div>
          </div>
          <div className='personal_info_flex'>
            <input type="text" className='edit_info_input' placeholder={currentUser.user.linkedin || "Facebook(not provided)"}
            name="linkedin" value={userInfo.linkedin} onChange={(e) => handleChange(e)}/>
            <div className='edit_info_button_trash center'
             onClick={() => setUserInfo({...Userinfo, linkedin: ""})}> <FaTrash /></div>
            <div className='edit_info_button center'
             onClick={() => setUserInfo({...Userinfo, linkedin: currentUser.user.linkedin || null})}> <BiRefresh /></div>
          </div>
        <button className='submit_edit_profile_button' type='submit' name="action" onClick={updateUser}>Finish</button>
        </form>
    </div>}
    </>
  )
}

export default Personalinfo