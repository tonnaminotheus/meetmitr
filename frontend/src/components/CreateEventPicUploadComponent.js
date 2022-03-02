import "./CreateEventPicUploadComponent.css"
import { useState } from "react"
import globalApi from "../globalApi";
import Cookies from "universal-cookie";
import axios from "axios";

const CreateEventPicUploadComponent=(props)=>{

    const {onImgUpload} = props

    const cookies = new Cookies();
    let user_cookie = cookies.get("cookie")
    console.log("cookie :"+user_cookie["accessToken"])

    const [img_path, setImgPath] = useState("")

    const [selectedFile, setSelectedFile] = useState(null)

    const toBase64=(file)=>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
    });

    const inputImg=(event)=>{
        setImgPath(event.target.value)
        toBase64(event.target.files[0]).then((img_src)=>{
            onImgUpload(img_src)
            setSelectedFile(event.target.files[0])
        })
    }


    const uploadImage=(event)=>{
        event.preventDefault();

        const formData = new FormData();
        formData.append(
            "file",
            selectedFile
        );
        axios.post(globalApi.upload, formData, {
            headers: {
                "Authorization" : "Bearer "+user_cookie["accessToken"],
            }
        }).then((res)=>{
            console.log("ok")
            console.log(res.data)
            onImgUpload(res.data.url)
        }).catch((error)=>{
            console.log("error")
            console.log(error.response)
        })
    }
    
    return (
        <div className="form-box">
            <form onSubmit={uploadImage}>
                <h3>Image Upload</h3>
                <input type="file" id="create_event_img_upload" className="custom-button" name="create_event_img_upload" accept="image/png, image/jpg" value={img_path} onChange={inputImg}/>
                <button type="submit" className="custom-button" id="upload-pic-btn">Upload</button>
            </form>
        </div>
    );
}

export default CreateEventPicUploadComponent;