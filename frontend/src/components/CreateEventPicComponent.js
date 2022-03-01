import "./CreateEventPicComponent.css"
import {useState} from "react"
import CreateEventPicDisplayComponent from "./CreateEventPicDisplayComponent"
import CreateEventPicUploadComponent from "./CreateEventPicUploadComponent"

const CreateEventPicComponent=(props)=>{
    // const [img_path,setPicURL] = useState("")
    const img_path = props.img_path
    const setPicURL = props.setPicURL

    const onImgUpload=(img_path)=>{
        console.log("img path :",img_path)
        setPicURL(img_path)
        props.setImgSrc(img_path)
    }

    return (
        <div className="pic-component-container">
            <div className="img-div-container">
                <CreateEventPicDisplayComponent img_path={img_path} onImgUpload={onImgUpload}/>
            </div>
            <div className="upload-div-container">
                <CreateEventPicUploadComponent onImgUpload={onImgUpload}/>
            </div>
        </div>
    );
}

export default CreateEventPicComponent;
