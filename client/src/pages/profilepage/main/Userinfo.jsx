import React from 'react'
import {RiHome2Fill} from "react-icons/ri"
import {MdWork, MdModeEditOutline} from "react-icons/md"
import {FaInstagram, FaFacebookF, FaLinkedin, FaUserEdit} from "react-icons/fa"

const Userinfo = ({user}) => {

  return (
    <div className='profile_user_info'>
      <h2>About me</h2>
      <p>
        <RiHome2Fill />
        Location: {user.location || "Not provided"}</p>
      <p>
        <MdWork />
        Occupation: {user.occupation || "Not provided"}</p>
      <h2>Socials</h2>
      <p><FaInstagram /> @{user.instagram || "Not provided"}</p>
      <p> <FaFacebookF /> {user.facebook || "Not provided"}</p>
      <p> <FaLinkedin /> {user.linkedin || "Not provided"} </p>
    </div>
  )
}

export default Userinfo