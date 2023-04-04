import React, { useState } from 'react'
import "./background.css"
import { MdPhotoCamera } from 'react-icons/md'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { storage } from '../../../firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import axios from "axios"
import {useSelector, useDispatch} from "react-redux"
import deleteImage from '../../../deleteImage'
import {updateBackground} from "../../../redux/rootSlice"
import Loading from '../../loading/Loading'

const Background = () => {
    const currentUser = useSelector(state => state)
    const [background, setBackground] = useState(false)
    const [imageUpload, setImageUpload] = useState(null)
    const [url, setUrl] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const dispatch = useDispatch();

    const updateUser = async (newBackground) => {
        setIsUploading(true)
        try {
        const res = await axios.patch("http://localhost:3001/api/v1/user/update", 
          {backgroundImage: newBackground}, {
            headers: {
              Authorization: `Bearer ${currentUser.token}`
            }
          }
        )
        dispatch(updateBackground(newBackground))
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImage = () => {
        setIsUploading(true)
         const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((
        ) => {
          getDownloadURL(imageRef).then((url) => {
            updateUser(url)
            setBackground(false)
            setIsUploading(false)
          })
        })
    }

    const removeBackground = async () => {
      if(!currentUser.user.backgroundImage) return
      deleteImage(currentUser.user.backgroundImage)
      dispatch(updateBackground(null))
      updateUser(null)
      setIsUploading(false)
      setBackground(false)
    }
    
  
    return (
    <>
    <div className='toggle_button' onClick={() => setBackground(true)}></div>
    
    {background && <div className='add_background_image_container center'>
        
        <div className='add_background_image center'>
            {isUploading && <Loading />}
            <div className='add_background_header'>
              <p>Add Background</p>
              <p className='close_profile_picture center'
                onClick={() => setBackground(false)}><AiOutlineArrowLeft />
            </p>
            </div>
            <div className='background_image_area'>
                {url && <img className='background_image_preview' src={url}/>}
                <p className='background_image_warning'>Bigger files might take longer to upload</p>
            </div>
                    <div className='background_image_buttons'>
                        <div className='background_image_file_input center'>
                          Choose background image
                          <input type="file" id="file" onChange={(event) => {
                            setImageUpload(event.target.files[0])
                            let imgUrl = URL.createObjectURL(event.target.files[0])
                            setUrl(imgUrl)}}/> 
                        </div>
                  
                        <button id='ri_button'
                        onClick={removeBackground}>Remove image</button>
                    </div>
                    <button className='background_image_button'
                    onClick={uploadImage}>Set background image</button>
            </div >  
        </div>}
    </>
  )
}

export default Background