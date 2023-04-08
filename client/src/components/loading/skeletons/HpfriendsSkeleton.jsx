import Skeleton from "./Skeleton";

import React from 'react'

const HpfriendsSkeleton = () => {
  return (
    <div className="friends">
        <div className="friend_container">
            <div className="friend">
                <Skeleton classes={"profile_picture"} />
            </div>
            <div className='friend_info'>
              <Skeleton classes={"text_short"} />
              <Skeleton classes={"text_short"} />
            </div>
            <Skeleton classes={"add_friend"} />
        </div>
        <div className="friend_container">
            <div className="friend">
                <Skeleton classes={"profile_picture"} />
            </div>
            <div className='friend_info'>
              <Skeleton classes={"text_short"} />
              <Skeleton classes={"text_short"} />
            </div>
            <Skeleton classes={"add_friend"} />
        </div>
        <div className="friend_container">
            <div className="friend">
                <Skeleton classes={"profile_picture"} />
            </div>
            <div className='friend_info'>
              <Skeleton classes={"text_short"} />
              <Skeleton classes={"text_short"} />
            </div>
            <Skeleton classes={"add_friend"} />
        </div>
        <div className="friend_container">
            <div className="friend">
                <Skeleton classes={"profile_picture"} />
            </div>
            <div className='friend_info'>
              <Skeleton classes={"text_short"} />
              <Skeleton classes={"text_short"} />
            </div>
            <Skeleton classes={"add_friend"} />
        </div>
    </div>
  )
}

export default HpfriendsSkeleton