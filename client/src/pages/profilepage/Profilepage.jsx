import React from 'react'
import Navbar from '../../components/Navbar'
import "./profilepage.css"
import Profilepagemain from './main/Profilepagemain'
import Profilepagetop from './Profilepagetop'


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