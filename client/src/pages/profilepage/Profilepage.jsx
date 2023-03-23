import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import "./profilepage.css"
import Profilepagemain from './main/Profilepagemain'
import Profilepagetop from './Profilepagetop'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Profilepage = () => {

  return (
    <div className='profilepage_container'>
    <Navbar />
    <Profilepagetop />
    <Profilepagemain />
    </div>
    
  )
}

export default Profilepage