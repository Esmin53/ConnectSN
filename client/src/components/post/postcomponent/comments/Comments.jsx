import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import "./comments.css"
import { Link } from 'react-router-dom'

const Comments = ({comments}) => {
    const currentUser = useSelector(state => state)
    const [showComments, setShowComments] = useState(false)  
    
    return (
    <div>
         {comments[0] && <div className="comment" id="comment_preview">
                        <Link to={`/myprofile/${comments[0].commentAuthorId}`} id="comment_name">
                            <img className='profile_picture' src={comments[0].profilePicture} /> 
                        </Link>
                            <div className='comment_content'> 
                            <Link to={`/myprofile/${comments[0].commentAuthorId}`} id="comment_name">{comments[0]?.firstName} {comments[0]?.lastName}</Link>
                                <p id='comment_content'>{comments[0]?.content}</p>
                            </div>
                        </div>}
        <p className='see_all_comments' onClick={() => setShowComments(true)}>See all comments</p>
        {showComments && <div className='comments_container'>
            <div className='comments'> 
            <p className='close_profile_picture center'
            onClick={() => setShowComments(false)}><AiOutlineArrowLeft /></p>
            <div className='comments_header'> 
                <p>Comments</p>
                
            </div>
                {comments.map((item, index) => {
                    return <div className="comment" key={index}>
                        <Link to={`/myprofile/${item.commentAuthorId}`} id="comment_name">
                            <img className='profile_picture' src={item?.profilePicture} /> 
                        </Link>
                            <div className='comment_content'> 
                            <Link to={`/myprofile/${item.commentAuthorId}`} id="comment_name">{item?.firstName} {item?.lastName}</Link>
                                <p id='comment_content'>{item?.content}</p>
                            </div>
                        </div>
                })}
            </div>
        </div>}
    </div>
  )
}

export default Comments