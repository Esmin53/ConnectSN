import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Loading from './components/loading/Loading';

const Redirect = () => {
    const location = useLocation();
    const userId = location.pathname.split("/")[2]
  
    return (
    <>
        <Loading />
        <Navigate to={`/profile/${userId}`} />
    </>
  )
}

export default Redirect