import React from 'react'
import Skeleton from "./Skeleton.jsx"

const HpInfoSkeleton = () => {
  return (
    <div className='userinfo_container'>
        <div className='userinfo_top'>
            <Skeleton classes={'userinfo_profile_picture'} />
        </div>
        <div className='userinfo_content'>
           <div className='userinfo'> 
            <Skeleton classes={"text_short"} />
            <Skeleton classes={"text_short"} />
           </div>
           <div className='userinfo'> 
           <Skeleton classes={"text_short"} />
            <Skeleton classes={"text_short"} />
           </div>
           <div className='break_line'></div>
           <div className='userinfo'> 
           <Skeleton classes={"text_short"} />
            <Skeleton classes={"text_short"} />
           </div>
           <div className='userinfo'> 
           <Skeleton classes={"text_short"} />
            <Skeleton classes={"text_short"} />
           </div>
           <div className='userinfo_statistics'>
                <div className='userinfo_statistics_flex'>
                    <Skeleton classes={"statistics_number"}/>
                    <Skeleton classes={"text_short"} />
                </div>
                <div className='userinfo_statistics_flex'>
                    <Skeleton classes={"statistics_number"}/>
                    <Skeleton classes={"text_short"} />
                </div>
                <div className='userinfo_statistics_flex'>
                    <Skeleton classes={"statistics_number"}/>
                    <Skeleton classes={"text_short"} />
                </div>
           </div>
        </div>
        <div className='center' style={{marginTop: "1.5rem"}}>
            <Skeleton classes={"edit_profile_button"}/>
        </div>
    </div>
  )
}

export default HpInfoSkeleton