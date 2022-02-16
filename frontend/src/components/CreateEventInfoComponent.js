import "./CreateEventInfoComponent.css";
import InfoFormComponent from "./InfoFormComponent";
import { useState } from 'react';


const CreateEventInfoComponent=(props)=>{
    return (
        <div className="info-component-container">
            <InfoFormComponent eventID={props.eventID}/>
        </div>
    );
}

export default CreateEventInfoComponent;