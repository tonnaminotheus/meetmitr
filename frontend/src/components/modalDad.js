import JoinEventFilterModal from "./modal";
import { useState } from "react";

//modal
function ModalDad() {
  const date = () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    return date;
  };

  //data to get from form
  const [joinEventFilterProps, setJoinEventFilterProps] = useState({});

  //passed function
  const onFilterSubmit = (filter_props) => {
    console.log("get props from child compo");
    setJoinEventFilterProps(filter_props);
  };

  return (
    <div className="App">
      <h1>Create Event Page</h1>
      <div className="modal-filter-container">
        <JoinEventFilterModal onFilterSubmit={onFilterSubmit} />
      </div>
    </div>
  );
}

export default ModalDad;
