import "./EditEventComponent.css";
import CreateEventPicComponent from "./CreateEventPicComponent"
import CreateEventInfoComponent from "./CreateEventInfoComponent"
import { useLocation } from "react-router-dom"

const EditEventComponent=(props)=>{

    const {state} = useLocation();
    // console.log("eventID :"+eventID)  
    
    return (
        <div className="create-event-container">
            <CreateEventPicComponent/>
            {state&&<CreateEventInfoComponent eventID={state.eventId}/>}
            {!state&&<CreateEventInfoComponent/>}
        </div>
    );
}

export default EditEventComponent;
