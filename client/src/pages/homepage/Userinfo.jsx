import React, { useEffect } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';

const Userinfo = () => {
  
    const curentUser = useSelector(state => state)

    const fetchUser = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/v1/user/info/${curentUser.user._id}`, {
                headers: {
                    authorization: `Bearer ${curentUser.token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        fetchUser();
    }, [])
  
    return (
    <div className='userinfo_container'>
        <p className='fr'>Personal info</p>
        <div className='userinfo'>
            <p>Firstname:</p>
            <p>{curentUser.user.firstName}</p>
        </div>
        <div className='userinfo'>
            <p>Lastname:</p>
            <p>{curentUser.user.lastName}</p>
        </div>
        <div className='userinfo'>
            <p>Email: </p>
            <p>{curentUser.user.email}</p>
        </div>
        <div className='userinfo'>
            <p>Location: </p>
            <p>{curentUser.user.location || "Not specified"}</p>
        </div>
        <div className='userinfo'>
            <p>Occupation: </p>
            <p>{curentUser.user.occupation || "Not specified"}</p>
        </div>
        <div className='line'></div>
        <p className='fr'>Impressions</p>
        <div className='userinfo'>
            <p>Friends:</p>
            <p>{curentUser?.user?.friends?.length}</p>
        </div>
        <div className='userinfo'>
            <p>Posts: </p>
            <p>32</p>
        </div>
        <div className='line'></div>
        <p className='fr'>Socials</p>
        <div className='userinfo'>
            <p>Facebook:</p>
            <p>{curentUser.user.facebook || "Not provided"}</p>
        </div>
        <div className='userinfo'>
            <p>Instagram: </p>
            <p>{curentUser.user.instagram || "Not provided"}</p>
        </div>
    </div>
  )
}

export default Userinfo