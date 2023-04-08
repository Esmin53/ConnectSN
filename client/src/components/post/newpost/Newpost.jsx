import React, { useState } from 'react'
import "./newpost.css"
import "./createpost.css"
import { FaImage, FaTimes } from "react-icons/fa"
import { MdDone } from "react-icons/md"
import { useSelector } from "react-redux"
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { storage } from '../../../firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import axios from 'axios'
import Loading from "../../loading/Loading"
const Newpost = () => {
  const currentUser = useSelector(state => state)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageUpload, setImageUpload] = useState(null)
  const [text, setText] = useState("")

  const uploadPost = async (url) => {
    try {
      const res = await axios.post("http://localhost:3001/api/v1/post/newpost", {
        image: url,
        text: text
      },  {
            headers: {
              Authorization: `Bearer ${currentUser.token}`
            }
          }
      )
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const uploadImage = () => {
    setIsLoading(true)
    if(imageUpload === null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((
        ) => {
          getDownloadURL(imageRef).then((url) => {
            uploadPost(url);
            setIsLoading(false)
            setIsOpen(false)
          })
        })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      uploadImage();
    } catch (error) {
      
    }
  }

  return (
    <>
    <div className="newpost_container" onClick={() => setIsOpen(true)}>
      <div className="newpost_flex">
          <img className="profile_picture" src={currentUser.user.profilePicture} alt={currentUser.user.firstName} id="newpost_profile_picture"/>
        <div className="post_input"> <p id="post_input">What's on your mind?</p></div>
      </div>
      <div className='line'></div>
      <div className="newpost_flex">
        <button className="post_image_button">
          <p>Add an image</p> <FaImage />
        </button>
      </div>
    </div>
    {isOpen && <div className='create_post_container'>
      { isLoading && <Loading /> }
      <form className='create_post_form' onSubmit={handleSubmit}>
        <div className='create_post_header'>
          <h3>New Post</h3>
          <p className='close_profile_picture center'
        onClick={() => setIsOpen(false)}><AiOutlineArrowLeft />
        </p>
        </div>
        <div className='create_post_user_info'>
          <img className='profile_picture' src={currentUser?.user?.profilePicture} />
          <div className='create_post_user_info_flex'>
            <p>{currentUser.user.firstName} {currentUser.user.lastName}</p>
          </div>
        </div>
        <textarea className='create_post_input' placeholder="What's on your mind?"
        onChange={(e) => setText(e.target.value)}/>
        <div className='center'>
          <div className='create_post_image_container'>
            {imagePreview && <img src={imagePreview} alt="An image you are submitting" 
            className='create_post_image'/>}
            <div className='create_post_image_button center' > 
          Add an image
          <input type="file" id='file' 
            onChange={(event) => {
                setImageUpload(event.target.files[0])
                let imgUrl = URL.createObjectURL(event.target.files[0])
                setImagePreview(imgUrl)
                }}
          /></div>
          {imagePreview && <div className='remove_post_image_button center'
          onClick={() => setImagePreview(null)}>
              <FaTimes />
          </div> } 
          </div>
        </div>
        <div className='create_post_button_container'>

          <button className='button create_post_submit_button' type="submit">Done</button>
        </div>
      </form>
    </div>}
    </>
  );
}

export default Newpost