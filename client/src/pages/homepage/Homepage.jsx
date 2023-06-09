import React from 'react';
import "./homepage.css";
import { useSelector } from 'react-redux'
import Navbar from '../../components/Navbar'
import Userinfo from './Userinfo'
import Posts from './Posts';
import Friends from './Friends';
import Newpost from "../../components/post/newpost/Newpost"
import Recommend from '../../components/recommendFriends/Recommend';

const Homepage = () => {
    const currentUser = useSelector(state => state)

  return (
    <>
      <Navbar />
      <div className='homepage_container'>
        <Userinfo />
        <div className='homepage_posts'>
          <Newpost />
          <Recommend />
          <Posts />
        </div>
        <Friends />
      </div>
    </>
  )
}

export default Homepage