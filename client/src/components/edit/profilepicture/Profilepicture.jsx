import React from 'react'
import "./profilepicture.css"
import { MdPhotoCamera } from 'react-icons/md'
import { useState } from 'react'
import {AiOutlineArrowLeft} from "react-icons/ai"
import { storage } from '../../../firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import axios from "axios"
import {useSelector, useDispatch} from "react-redux"
import Loading from '../../loading/Loading'
import { updateProfilePicture } from '../../../redux/rootSlice'
import deleteImage from '../../../deleteImage'

const Profilepicture = () => {
    const defaultUrl = "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
    const currentUser = useSelector(state => state)
    const [profilePicture, setProfilePicture] = useState(false)
    const [imageUpload, setImageUpload] = useState(null)
    const [url, setUrl] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const dispatch = useDispatch()


    const updateUser = async (newPfp) => {
      try {
        const res = await axios.patch("http://localhost:3001/api/v1/user/update", 
          {profilePicture: newPfp}, {
            headers: {
              Authorization: `Bearer ${currentUser.token}`
            }
          }
        )
        dispatch(updateProfilePicture(newPfp))
      } catch (error) {
        console.log(error)
      }
    }

    const uploadImage = () => {
      setIsUploading(true)
        if(imageUpload === null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((
        ) => {
          getDownloadURL(imageRef).then((url) => {
            updateUser(url)
            setProfilePicture(false)
            setIsUploading(false)
          })
        })
    }

    const removeProfilePicture = () => {
      if(currentUser.user.profilePicture === defaultUrl) return
      deleteImage(currentUser.user.profilePicture)
      dispatch(updateProfilePicture(defaultUrl))
      updateUser(defaultUrl)
      setIsUploading(false)
      setProfilePicture(false)
    }

  return (
    <>
    <div className='toggle_button' onClick={() => setProfilePicture(true)}>

    </div>
    
    {profilePicture && <div className='add_profile_picture_container center'>
         <div className='add_profile_picture'>
            {isUploading && <Loading />}
            <div className='add_profile_picture_header center'>
              <p>Add Profile Picture</p>
            </div>
            <p className='close_profile_picture center'
            onClick={() => setProfilePicture(false)}><AiOutlineArrowLeft /></p>
            <div className='profile_picture_area center'>
                {<img src={url} className="profile_picture_preview"/>}
            </div>
            <div className='profile_picture_file_input center'>
              Choose a picture
                <input type="file" id='file'
                 onChange={(event) => {
                setImageUpload(event.target.files[0])
                let imgUrl = URL.createObjectURL(event.target.files[0])
                setUrl(imgUrl)
                }} className="add_picture_input"/>
            </div>
            <button onClick={removeProfilePicture} id="ri_button"
            style={{margin: "0.25rem 0 0 0"}}>Remove profile picture</button>
            <button onClick={uploadImage}>Add profile picture</button>
         </div>
    </div>}
    </>
  )
}

export default Profilepicture