import React, { useEffect, useState } from 'react';
import "./navbar.css";
import {AiFillHome, AiOutlineSearch} from "react-icons/ai";
import {FaBell, FaUserAstronaut} from "react-icons/fa";
import {IoSettingsSharp} from "react-icons/io5";
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateFriends, updateRequsets } from '../redux/rootSlice';
import axios from 'axios';
import Search from './search/Search';

const Navbar = () => {
    const currentUser = useSelector(state => state)
    const [openSettings, setOpenSettings] = useState(false);
    const [openRequests, setOpenRequests] = useState(false);
    const [requests, setRequests] = useState([]); 
   
    let focused = "search_focused"
    let unFocused = "search"
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        navigate("/");
        localStorage.clear();
        dispatch(logout());
    }
    
    const getRequests = async () => {
        try {
            const res = await axios.post("http://localhost:3001/api/v1/user/getRequests", {
                array: currentUser?.user?.recievedRequests
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
    }, [currentUser?.user?.recievedRequests])

    if(!currentUser.user) {
        return <Navigate to="/"/>
    }

  return (
    <div className='navbar_container'>
        <div className='navbar_left'>
            <h2 className='logo'>Connect</h2>
            <Search />
        </div>
            
        <ul className='navbar_right'>
            <Link to="/home" className='center navbar_icon'>
                <AiFillHome />
            </Link>
            <Link to={`/navigate/${currentUser.user._id}`} className='center navbar_icon'>
                <FaUserAstronaut />
            </Link>
            <li className='center navbar_icon' onClick={() => {
                    setOpenSettings(prev => false)
                    setOpenRequests(prev => !openRequests)
                }}>
                <FaBell  />
                {currentUser?.user?.recievedRequests?.length > 0 && <span className='notifications_counter center'>
                    {currentUser?.user?.recievedRequests?.length }
                </span>}
                {openRequests && <ul id='requests_dropdown' className='dropdown'>
                    {requests.map((item, index) => {
                        return <li className='navbar_request' key={index}>
                        <div className='navbar_request_info'>
                            <img className='profile_picture' src={item.profilePicture} />
                            <p>{item.firstName} {item.lastName} sent you a friend request</p>
                        </div>
                        <div className='navbar_request_buttons'>
                            <button className='request_button' style={{background: "#145DA0"}}
                            onClick={() => responseRequest(true, item._id)}>Accept</button>
                            <button className='request_button' style={{background: "#383838"}}
                            onClick={() => responseRequest(false, item._id)}>Delete</button>
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
                    <Link to={`/navigate/${currentUser.user._id}`} className='settings center'>Profile</Link>
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