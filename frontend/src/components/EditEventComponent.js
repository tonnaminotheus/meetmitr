import "./EditEventComponent.css";
import CreateEventPicComponent from "./CreateEventPicComponent"
import CreateEventInfoComponent from "./CreateEventInfoComponent"
import { useLocation } from "react-router-dom"
import { useState } from "react";

const EditEventComponent=(props)=>{

    const {state} = useLocation();
    // console.log("eventID :"+eventID)  
    
    const [img_path,setPicURL] = useState("")
    
    return (
        <div className="create-event-container">
            <CreateEventPicComponent setImgSrc={setImgSrc}/>
            {state&&<CreateEventInfoComponent eventID={state.eventId} img_src={img_path}/>}
            {!state&&<CreateEventInfoComponent/>}
        </div>
    );
}

export default EditEventComponent;
