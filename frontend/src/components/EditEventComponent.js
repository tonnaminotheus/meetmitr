import "./EditEventComponent.css";

import CreateEventPicComponent from "./CreateEventPicComponent";
import CreateEventInfoComponent from "./CreateEventInfoComponent";
import { useLocation, useNavigate } from "react-router-dom";

const EditEventComponent = (props) => {
  const { eventID } = useLocation();

  return (
    <div className="create-event-container">
      <CreateEventPicComponent />
      <CreateEventInfoComponent eventID={eventID} />
    </div>
  );
};

export default EditEventComponent;
