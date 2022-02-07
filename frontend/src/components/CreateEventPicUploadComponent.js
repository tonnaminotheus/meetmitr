import "./CreateEventPicUploadComponent.css"
import { useState } from "react"
const CreateEventPicUploadComponent=(props)=>{

    const [img_path, setImgPath] = useState("")

    const inputImg=(event)=>{
        console.log(event.target.value)
        setImgPath(event.target.value)
    }

    const {onImgUpload} = props

    const uploadImage=(event)=>{
        event.preventDefault();
        let img_input = document.querySelector("#create_event_img_upload")
        console.log("uploadImage :",img_input.value)
        // img_path = img_input.value
        onImgUpload(img_path)
        setImgPath("")
    }
    
    return (
        <div className="form-box">
            <form onSubmit={uploadImage}>
                <h3>Image Upload</h3>
                <input type="file" id="create_event_img_upload" name="create_event_img_upload" accept="image/png, image/jpg" value={img_path} onChange={inputImg}/>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default CreateEventPicUploadComponent;