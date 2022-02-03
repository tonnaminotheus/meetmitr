import "./CreateEventPicComponent.css"
import {useState} from "react"
import CreateEventPicDisplayComponent from "./CreateEventPicDisplayComponent"
import CreateEventPicUploadComponent from "./CreateEventPicUploadComponent"

const CreateEventPicComponent=()=>{
    const [img_path,setPicURL] = useState("")

    const onImgUpload=(img_path)=>{
        console.log("img path :",img_path)
        setPicURL(img_path)
    }

    return (
        <div>
            <CreateEventPicDisplayComponent img_path={img_path}/>
            <CreateEventPicUploadComponent onImgUpload={onImgUpload}/>
        </div>
    );
}

export default CreateEventPicComponent;
