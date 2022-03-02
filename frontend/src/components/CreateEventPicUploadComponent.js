import "./CreateEventPicUploadComponent.css"
import { useState } from "react"
import globalApi from "../globalApi";
import Cookies from "universal-cookie";
import axios from "axios";

const CreateEventPicUploadComponent=(props)=>{

    // const global_img_path = props.img_path
    const setPicURL = props.setPicURL

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
            // setPicURL(img_src)
            setSelectedFile(event.target.files[0])
        })
    }


    const uploadImage=(event)=>{
        event.preventDefault();

        //disable button upload
        let uploadBtn = document.getElementById("upload-pic-btn")
        uploadBtn.disabled = true;
        uploadBtn.innerText = "Uploading...";

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
            let new_img_path = props.img_path
            new_img_path.push(res.data.url)
            setPicURL(new_img_path)

            if (props.img_path.length > 0) {
                props.setPicPtr(props.img_ptr+1)
            }
            alert("Upload Successfully!!")
            
        }).catch((error)=>{
            console.log("error")
            console.log(error.response)
            alert("Upload not successful!!")
        })
        .finally(()=>{
            //enable button upload
            uploadBtn.disabled = false;
            uploadBtn.innerText = "Upload"
        })
    }
    
    return (
        <div className="form-box">
            <form onSubmit={uploadImage}>
                <div><h3>Image Upload</h3></div>
                <input type="file" id="create_event_img_upload" className="custom-button" name="create_event_img_upload" value={img_path} accept="image/png, image/jpg" onChange={inputImg}/>
                <button type="submit" className="custom-button" id="upload-pic-btn">Upload</button>
            </form>
        </div>
    );
}

export default CreateEventPicUploadComponent;