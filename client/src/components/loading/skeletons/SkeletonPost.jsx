import Skeleton from "./Skeleton";

import React from 'react'

const SkeletonPost = () => {
  return (
    <div className="post_container">
        <div className="post_header">
            <div className="post_header_info_container">
                <Skeleton classes={"profile_picture"} />
                <div className="post_header_info">
                    <Skeleton classes={"text_short"} />
                    <Skeleton classes={"text_short"} />
                </div>
            </div>
            <Skeleton classes={"text width-100"} />
            <Skeleton classes={"text width-100"} />
            <Skeleton classes={"text width-50"} />
            <Skeleton classes={"post_image"} />
            <div className="post_footer">
                <div className='post_likes_comments_flex'>
                    <Skeleton classes={"text_short"} />
                    <Skeleton classes={"text_short"} />
                </div>
                <div className='break_line'></div>
                <div className='post_options'>
                    <Skeleton classes={"post_option"} />
                    <Skeleton classes={"post_option"} />
                </div>
                <div className='break_line'></div>
                <div className='skeleton_post_new_comment'>
                    <Skeleton classes={"profile_picture"} />
                    <Skeleton classes={`post_new_comment_input`} /> 
                </div>
            </div>
            <Skeleton classes={"text_short"} />
        </div>

    </div>
  )
}

export default SkeletonPost