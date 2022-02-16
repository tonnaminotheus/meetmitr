import "./EditEventComponent.css"

import CreateEventPicComponent from "./CreateEventPicComponent"
import CreateEventInfoComponent from "./CreateEventInfoComponent"
import { useNavigate } from "react-router-dom"

const editEventComponent=(props)=>{

    const {eventID} = useNavigate();
    
    return (
        <div className="create-event-container">
            <CreateEventPicComponent/>
            <CreateEventInfoComponent eventID={eventID}/>
        </div>
    );
}

export default editEventComponent;
