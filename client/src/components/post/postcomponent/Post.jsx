import React, { useEffect, useState } from 'react'
import "./Post.css"
import {AiFillLike, AiFillEdit, AiFillDelete} from "react-icons/ai"
import { FaCommentAlt } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {BsThreeDots}  from "react-icons/bs"
import deleteImage from "../../../deleteImage"
import { relativetime } from './relativetime'

const Post = ({image, text, authorId, likes, _id, createdAt}) => {
    const currentUser = useSelector(state => state)
    const [author, setAuthor] = useState({})
    const [likedBy, setLikedBy] = useState(likes) 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const getAuthorInfo = async () => {
        try {
      const res = await axios.get(`http://localhost:3001/api/v1/user/light/${authorId}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
        setAuthor(res.data)
        } catch (error) {
            console.log(error)   
        }
    }

    const likePost = async () => {
        try {
            const res = await axios.post(`http://localhost:3001/api/v1/post/like`, {
                postId: _id
            },{
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
            setLikedBy(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deletePost = async () => {
        deleteImage(image);
        try {
            const res = await axios.delete(`http://localhost:3001/api/v1/post/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })    
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAuthorInfo()
    }, [])

    const timestamp = relativetime(createdAt)

    return (
    <div className='post_container'>
        <div className='post_header'>
            <div className='post_header_info_container'>
                <img className='profile_picture' src={author.profilePicture} alt="Author profile picture" />
                <div id="post_header_info">
                <Link to={`/myprofile/${authorId}`} className="Link">{author.firstName} {author.lastName}</Link>
                <p style={{fontSize: "0.8rem"}}>{timestamp}</p>
            </div>
            <div className='post_author_options center'>
                <BsThreeDots  onClick={() => setIsDropdownOpen(prev => !prev)}/>
                {isDropdownOpen && <ul className='dropdown' id='post_options_dropdown'>
                        <li className='settings center'><AiFillEdit /> Edit</li>
                        <li className='settings center' onClick={() => deletePost()}><AiFillDelete /> Delete</li>                    
                    </ul>}
            </div>
            </div>
            <p className='post_text_content'>{text}</p>
        </div>
        <img className='post_image' src={image} alt='post' />
        <div className='post_footer'>
            <p id="post_likes"> <AiFillLike 
            style={{color: `${likedBy?.includes(currentUser.user._id) ? "var(--blue-dark)" : "f3f3f3"}`}}/> {likedBy.length} likes</p>
            <div className='break_line'></div>
            <div className='post_options'>
                <p className='post_option center'
                onClick={() => likePost()}> <AiFillLike /> I like this</p>
                <p className='post_option center'> <FaCommentAlt />Comment</p>
            </div>
        </div> 
    </div>
  )
}

export default Post