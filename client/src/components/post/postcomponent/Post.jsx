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
import Comments from './comments/Comments'
import SkeletonPost from '../../loading/skeletons/SkeletonPost'

const commentRegex =  /^\s*$/

const Post = ({image, text, authorId, likes, _id, createdAt, comments}) => {
    const currentUser = useSelector(state => state)
    const [author, setAuthor] = useState({})
    const [likedBy, setLikedBy] = useState(likes)
    const [comment, setComment] = useState("")
    const [commentsArray, setCommentsArray] = useState(comments)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [error, setError] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    const getAuthorInfo = async () => {
        setIsFetching(true)
        try {
      const res = await axios.get(`http://localhost:3001/api/v1/user/light/${authorId}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
        setAuthor(res.data)
        setIsFetching(false)
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

    const commentPost = async () => {
        if(comment?.match(commentRegex)) {
            setError(true)
            console.log(error)
            return
        }
        try {
            const res = await axios.post(`http://localhost:3001/api/v1/post/comment/${_id}`, {
                commentAuthorId: currentUser.user._id,
                content: comment,
                firstName: currentUser.user.firstName,
                lastName: currentUser.user.lastName,
                profilePicture: currentUser.user.profilePicture 
            },{
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
         setComment("")
         setCommentsArray(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deletePost = async () => {
        if(currentUser.user._id !== authorId) return
        currentUser.user._id === authorId && deleteImage(image);
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

    if(isFetching) {
        return <SkeletonPost />
    }

    return (
    <div className='post_container'>
        <div className='post_header'>
            <div className='post_header_info_container'>
                <Link to={`/navigate/${authorId}`}>
                    <img className='profile_picture' src={author.profilePicture} alt="Author profile picture" />
                </Link>
                <div id="post_header_info">
                    <Link to={`/navigate/${authorId}`} className="Link">{author.firstName} {author.lastName}</Link>
                    <p style={{fontSize: "0.8rem"}}>{timestamp}</p>
                </div>
                {currentUser.user._id === authorId && <div className='post_author_options center'>
                <BsThreeDots  onClick={() => setIsDropdownOpen(prev => !prev)}/>
                {isDropdownOpen && <ul className='dropdown' id='post_options_dropdown'>
                    <li className='settings center'><AiFillEdit /> Edit</li>
                    <li className='settings center' onClick={() => deletePost()}><AiFillDelete /> Delete</li>                    
                </ul>}
                </div>}
            </div>
            <p className='post_text_content'>{text}</p>
        </div>
        <img className='post_image' src={image} alt='post' />
        <div className='post_footer'>
            <div className='post_likes_comments_flex'>
                <p id="post_likes"> <AiFillLike 
                style={{color: `${likedBy?.includes(currentUser.user._id) ? "var(--blue-dark)" : "#f3f3f3"}`}}/> {likedBy.length} likes</p>
                <p>{commentsArray?.length} comment{commentsArray.length !== 1 && "s"}</p>
            </div>
            <div className='break_line'></div>
            <div className='post_options'>
                <p className='post_option center' style={{color: `${likedBy?.includes(currentUser.user._id) ? "var(--blue-dark)" : "#f3f3f3"}`}}
                onClick={() => likePost()}> <AiFillLike /> I like this</p>
                <p className='post_option center' style={{color: `${comment?.length > 0 ? "#145DA0" : "#f3fef3"}`}}
                onClick={() => commentPost()}> <FaCommentAlt />Comment</p>
            </div>
            <div className='break_line'></div>
            <div className='post_new_comment'>
                <img className='profile_picture' src={currentUser.user.profilePicture} />
                <textarea type="text" className={`post_new_comment_input ${error && "post_new_comment_error"}`} value={comment} 
                onChange={(e) => {
                error && setError(null)
                setComment(e.target.value)}} placeholder="Add a comment..." /> 
            </div>
            <Comments comments={commentsArray} />
        </div> 
    </div>
  )
}

export default Post