import React, { useRef } from 'react'
import "./recommend.css"
import {FaUserPlus} from "react-icons/fa"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

const Recommend = () => {

    const ref = useRef(null)
    


  return (
    <div className='scroll_container'>
        <div className='scroll_button sb-l center'> <AiOutlineArrowLeft /> </div>
        <div className='scroll_button sb-r center'> <AiOutlineArrowRight /> </div>
    <div className='recommend_friends_container' ref={ref}>
        <div className='friend_recomendation'>
            <img className='recommended_profile_picture' src="https://poznatelicnosti.org/wp-content/uploads/2019/02/Kemal-Malov%C4%8Di%C4%87-Biografija-Visina-Te%C5%BEina-Godi%C5%A1te-700x400.jpg"/>
            <p>Kemal Malovičić</p>
            <p>Location: Banovici</p>
            <button className='add_recomendation center'>Add Friend <FaUserPlus /></button>
        </div>
        <div className='friend_recomendation'>
            2
        </div>
        <div className='friend_recomendation'>
3
        </div>       
        <div className='friend_recomendation'>
4
        </div>       
        <div className='friend_recomendation'>
5
        </div>       
        <div className='friend_recomendation'>
6
        </div>       
        <div className='friend_recomendation'>
7
        </div>       
        <div className='friend_recomendation'>
8
        </div>       
    </div>
    </div>
  )
}

export default Recommend