import "./CreateEventPicComponent.css"
import {useState} from "react"
import CreateEventPicDisplayComponent from "./CreateEventPicDisplayComponent"
import CreateEventPicUploadComponent from "./CreateEventPicUploadComponent"

const CreateEventPicComponent=(props)=>{
    // const [img_path,setPicURL] = useState("")
    // const img_path = props.img_path
    const setPicURL = props.setPicURL

    // const setPicURL=(img_path)=>{
    //     console.log("img path :",img_path)
    //     setPicURL(img_path)
    //     props.setImgSrc(img_path)
    // }

    // const [img_ptr,setPicPtr] = useState(Math.max(img_path.length-1,0))

    return (
        <div className="pic-component-container">
            <div className="img-div-container">
                <CreateEventPicDisplayComponent img_path={props.img_path} setPicURL={setPicURL} img_ptr={props.img_ptr} setPicPtr={props.setPicPtr}/>
            </div>
            <div className="upload-div-container">
                <CreateEventPicUploadComponent img_path={props.img_path} setPicURL={setPicURL} img_ptr={props.img_ptr} setPicPtr={props.setPicPtr}/>
            </div>
        </div>
    );
}

export default CreateEventPicComponent;
