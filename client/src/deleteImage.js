import { storage } from './firebase'
import {getDownloadURL, ref, deleteObject, listAll} from "firebase/storage"

const deleteImage = (imageUrl) => {
    const imageListRef = ref(storage, 'images')
    listAll(imageListRef).then((response) => {     
        response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
                console.log(item)
                if(imageUrl === url) {
                    deleteObject(item)            
                }
            })
        })
    })
}

export default deleteImage