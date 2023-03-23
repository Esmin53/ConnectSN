import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Post from '../../../components/post/postcomponent/Post';

const Posts = ({userId}) => {
    const currentUser = useSelector(state => state);
    const [posts, setPosts] = useState()

    const getPosts = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/v1/post/profile/${userId}`)
            setPosts(res.data)
        } catch (error) {
            
        }
    }
  
    useEffect(() => {
        getPosts();
    }, [])
    
    return (
    <div>
        {
            posts?.map((item, index) => {
                return <Post {...item} key={index}/>
            })
        }
    </div>
  )
}

export default Posts