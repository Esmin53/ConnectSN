import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Post from '../../../components/post/postcomponent/Post';

const Posts = () => {
    const currentUser = useSelector(state => state);
    const location = useLocation()
    const userId = location.pathname.split("/")[2];
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/v1/post/profile/${userId}`)
            setPosts(res.data)
        } catch (error) {
            
        }
    }
  
    useEffect(() => {
        getPosts();
    }, [userId])
    
    const array = posts?.map((item, index) => {
        return <Post {...item} key={index}/>
    })

    return (
    <div>
        {array}
    </div>
  )
}

export default Posts