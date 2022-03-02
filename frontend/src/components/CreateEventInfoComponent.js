import "./CreateEventInfoComponent.css";
import InfoFormComponent from "./InfoFormComponent";
import { useState } from 'react';


const CreateEventInfoComponent=(props)=>{
    // const [img_path,setPicURL] = useState("")
    // const img_path = props.img_path
    // const setPicURL = props.setPicURL

    return (
        <div className="info-component-container">
            <InfoFormComponent eventID={props.eventID} img_path={props.img_path} setPicURL={props.setPicURL}/>
        </div>
    );
}

export default CreateEventInfoComponent;