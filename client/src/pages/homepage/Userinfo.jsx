import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import PersonalInfo from "../../components/edit/personalinfo/Personalinfo"
import HpInfoSkeleton from '../../components/loading/skeletons/HpInfoSkeleton';
 
const Userinfo = () => {
  
    const curentUser = useSelector(state => state)
    const [statistics, setStatistics] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    const fetchUserStats = async () => {
        setIsFetching(true)
        try {
            const res = await axios.get(`http://localhost:3001/api/v1/user/stats`, { 
                headers: {
                    authorization: `Bearer ${curentUser.token}`
                }
            })
            setStatistics(res.data)
            setIsFetching(false)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        fetchUserStats();
    }, [])

    if(isFetching) {
        return <HpInfoSkeleton />
    }
  
    return (
    <div className='userinfo_container'>
        <div className='userinfo_top'>
            <img src={curentUser.user.profilePicture} className='userinfo_profile_picture' />
        </div>
        <div className='userinfo_content'>
           <div className='userinfo'> 
            <p>Location: </p>
            <p>{curentUser.user.location || "Not provided"}</p>
           </div>
           <div className='userinfo'> 
            <p>Occupation: </p>
            <p>{curentUser.user.occupation || "Not provided"}</p>
           </div>
           <div className='break_line'></div>
           <div className='userinfo'> 
            <p>Facebook: </p>
            <p>{curentUser.user.facebook || "Not provided"}</p>
           </div>
           <div className='userinfo'> 
            <p>Instagram: </p>
            <p>{curentUser.user.instagram || "Not provided"}</p>
           </div>
           <div className='userinfo_statistics'>
                <div className='userinfo_statistics_flex'>
                    <h1>{curentUser?.user?.friends.length}</h1>
                    <p>Friends</p>
                </div>
                <div className='userinfo_statistics_flex'>
                    <h2>{statistics?.postsNumber}</h2>
                    <p>Posts</p>
                </div>
                <div className='userinfo_statistics_flex'>
                    <h2>{statistics?.likes}</h2>
                    <p>Likes</p>
                </div>
           </div>
           <div className='center' style={{marginTop: "1.5rem"}}>
            <PersonalInfo />
           </div>
        </div>
    </div>
  )
}

export default Userinfo