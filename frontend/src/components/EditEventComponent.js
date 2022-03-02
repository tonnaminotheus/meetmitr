import "./EditEventComponent.css";
import CreateEventPicComponent from "./CreateEventPicComponent";
import CreateEventInfoComponent from "./CreateEventInfoComponent";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const EditEventComponent = (props) => {
  const { state } = useLocation();
  // console.log("eventID :"+eventID)

    const {state} = useLocation();
    // console.log("eventID :"+eventID)  
    
    const [img_path,setPicURL] = useState([])
    const img_path_len = img_path.length
    console.log("new length "+ img_path_len)
    
    return (
        <div id="create-event-container">
            <CreateEventPicComponent img_path={img_path} setPicURL={setPicURL}/>
            {state&&<CreateEventInfoComponent eventID={state.eventId} img_path={img_path} setPicURL={setPicURL}/>}
            {!state&&<CreateEventInfoComponent img_path={img_path} setPicURL={setPicURL}/>}
        </div>
    );
}

export default EditEventComponent;
