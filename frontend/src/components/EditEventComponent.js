import "./EditEventComponent.css"

import CreateEventPicComponent from "./CreateEventPicComponent"
import CreateEventInfoComponent from "./CreateEventInfoComponent"

const editEventComponent=(props)=>{
    return (
        <div className="create-event-container">
            <CreateEventPicComponent/>
            <CreateEventInfoComponent eventID={props.eventID}/>
        </div>
    );
}

export default editEventComponent;
