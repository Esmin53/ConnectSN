import React, { useEffect, useState } from 'react';
import "./navbar.css";
import {AiFillHome} from "react-icons/ai";
import {FaBell, FaUserAstronaut, FaUserClock} from "react-icons/fa";
import {BiUserPlus, BiUserMinus} from "react-icons/bi"
import {IoSettingsSharp} from "react-icons/io5";
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateFriends, updateRequsets } from '../redux/rootSlice';
import axios from 'axios';

const Navbar = () => {
    const currentUser = useSelector(state => state)
    const [openSettings, setOpenSettings] = useState(false);
    const [openRequests, setOpenRequests] = useState(false);
    const [requests, setRequests] = useState([]); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        navigate("/");
        dispatch(logout());
    }

    
    const getRequests = async () => {
        try {
            const res = await axios.post("http://localhost:3001/api/v1/user/getRequests", {
                array: currentUser.user.recievedRequests
            }, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            })
            setRequests(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const responseRequest = async (response, id) => {
        try {
            const res = await axios.post("http://localhost:3001/api/v1/user/answerRequest", {
                friendId: id,
                response: response
            }, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            })
            dispatch(updateFriends(res.data.friends))
            dispatch(updateRequsets(res.data.recievedRequests))
            //getRequests();
        } catch (error) {
           console.log(error.response.data)
        }
    }

    useEffect(() => {
        getRequests();
    }, [])

    useEffect(() => {
        getRequests();
    }, [currentUser.user.recievedRequests])

    if(!currentUser.user) {
        return <Navigate to="/"/>
    }

  return (
    <div className='navbar_container'>
        <h2 className='logo'>Connect</h2>    
        <ul className='navbar_right'>
            <Link to="/home" className='center navbar_icon'>
                <AiFillHome />
            </Link>
            <Link to={`/myprofile/${currentUser.user._id}`} className='center navbar_icon'>
                <FaUserAstronaut />
            </Link>
            <li className='center navbar_icon' onClick={() => {
                    setOpenSettings(prev => false)
                    setOpenRequests(prev => !openRequests)
                }}>
                <FaBell  />
                {openRequests && <ul className='dropdown'>
                    {requests.map((item, index) => {
                        return <li className='navbar_request' key={index}>
                        <div className='profile_picture_container'>
                            <img className='profile_picture' src={item.profilePicture} />
                        </div>
                        <div className='request_info'>
                            <p>{item.firstName} {item.lastName} sent you a friend request</p>
                            <div className='request_buttons'>
                                <button className='request_button' style={{background: "#145DA0"}}
                                onClick={() => responseRequest(true, item._id)}>Accept</button>
                                <button className='request_button' style={{background: "#383838"}}
                                onClick={() => responseRequest(false, item._id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                    })}
                    {requests.length === 0 && <p className='navbar_request'>No new requests at the time</p>}
                </ul>}
            </li>
            <li className='center navbar_icon' onClick={() => {
                    setOpenRequests(prev => false)
                    setOpenSettings(prev => !openSettings)}}>
                <IoSettingsSharp />
                {openSettings && <ul className='dropdown'>
                    <Link to={`/myprofile/${currentUser.user._id}`} className='settings center'>Profile</Link>
                    <Link to={"/home"} className='settings center'>Homepage</Link>
                    <div className='break_line'></div>
                    <li className='settings center' onClick={handleLogout}>Sign out</li>
                </ul>}
            </li>
        </ul>
    </div>
  )
}

export default Navbar