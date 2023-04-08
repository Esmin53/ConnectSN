import Skeleton from "./Skeleton";
import React from 'react'

const ProfilePageSkeleton = () => {
  
    return (
    <div className="profile_page_top_container">
        <Skeleton classes={"profile_page_background_image_area"} />
        <div className="profile_page_user_info">
            
        </div>
    </div>
  )
}

export default ProfilePageSkeleton