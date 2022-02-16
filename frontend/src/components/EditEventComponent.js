import "./EditEventComponent.css"

import CreateEventPicComponent from "./CreateEventPicComponent"
import CreateEventInfoComponent from "./CreateEventInfoComponent"
import { useLocation } from "react-router-dom"

const EditEventComponent=(props)=>{

    const {eventID} = useLocation();
    // console.log("eventID :"+eventID)  
    
    return (
        <div className="create-event-container">
            <CreateEventPicComponent/>
            <CreateEventInfoComponent eventID={eventID}/>
        </div>
    );
}

export default EditEventComponent;
