import React, { useEffect, useRef, useState } from 'react'
import "./recommend.css"
import {FaUserPlus} from "react-icons/fa"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {MdHome, MdWork} from "react-icons/md"
import { updateSentRequests } from '../../redux/rootSlice'
import Personalinfo from '../edit/personalinfo/Personalinfo'

const Recommend = () => {
  const currentUser = useSelector(state => state)
  const [users, setUsers] = useState()
  const dispatch = useDispatch()
  const url = `http://localhost:3001/api/v1/user/recomendations?occupation=${'Web Developer'}&location=${currentUser.user.location}&&id=${currentUser.user._id}`
      const getRecomendations = async () => {
        try {
          const res = await axios.get(url,  {
            headers: {
              Authorization: `Bearer ${currentUser.token}`
            }
          }) 
          setUsers(res.data)
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
          console.log(res.data)
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {
        getRecomendations()
    }, [currentUser.user])

      const slideRight = () => {
        let scrollContainer = document.getElementById("scroll_conatiner")
        scrollContainer.scrollLeft = scrollContainer.scrollLeft + 130
        }
      const slideLeft = () => {
        let scrollContainer = document.getElementById("scroll_conatiner")
        scrollContainer.scrollLeft = scrollContainer.scrollLeft - 130
        }
      
    
  
    return ( 
    <div className='scroll_container'>
      {!users?.length === 0 && <button className='scroll_button sb-l center'
      onClick={slideLeft}><AiOutlineArrowLeft /></button>}
      {!users?.length === 0 && <button className='scroll_button sb-r center'
      onClick={slideRight}><AiOutlineArrowRight /></button>}
    <div className='recommend_friends_container' id="scroll_conatiner">
      
        {users?.map((item, index) => {
            return <div className='friend_recomendation' key={index}>          
            <img className='recommended_profile_picture' src={item.profilePicture}/>
            <p>{item.firstName} {item.lastName}</p>
            {item.occupation && <p className="center"><MdWork />: {item.occupation}</p>}
            {item.location && <p className="center"><MdHome />: {item.location}</p>}
            <button className='add_recomendation center'
            onClick={() => addFriend(item._id)}>Add Friend <FaUserPlus /></button>
        </div> 
        })}
        {users?.length === 0 && <div className='empty_recomended_message'>
          <p>Tell us more about yourself, and help us recommend you some new friends!</p>
          <Personalinfo />
          </div>}
    </div>
    </div>
  )
}


export default Recommend