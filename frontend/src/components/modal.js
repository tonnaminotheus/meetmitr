import "./modal.css";
import "../components/css_extensions/form_control.css"

import Modal from "react-modal";
import { Button } from "react-bootstrap";

// import { Button } from 'react-bootstrap';
import { Form } from "react-bootstrap";

const JoinEventFilterModal = (props) => {
  const onFilterSubmit = props.onFilterSubmit;

  const getTodayDate = () => {
    let today = new Date();
    let dd = today.getDate();
    if (dd < 10) dd = "0" + dd;

    let mm = today.getMonth() + 1; //jan is 0
    if (mm < 10) mm = "0" + mm;

    let yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  };

  const onClickSubmitFilter = (event) => {
    console.log("hi!!");
    event.preventDefault();
    const filter_props = {
      date_start: document.getElementById("filter-date-start").value,
      date_end: document.getElementById("filter-date-end").value,
      time_start: document.getElementById("filter-time-start").value,
      time_end: document.getElementById("filter-time-end").value,
      is_online: document.getElementById("Online-checkbox").value,
      is_onsite: document.getElementById("Onsite-checkbox").value,
    };
    console.log(filter_props);
    onFilterSubmit(filter_props);
  };

  Modal.setAppElement("#root");

  console.log(props.mState);

  return (
    // <div method="POST" className="modal">
    <div>
      <Modal isOpen={props.mState} onRequestClose={() => props.onClose()}>
        <form onSubmit={onFilterSubmit}>
          <div className="info-form-box">
            <h3>Date</h3>
            <label htmlFor="date-start">Date Start :</label>
            <input
              type={"date"}
              id={"filter-date-start"}
              min={getTodayDate()}
            ></input>

            <label htmlFor="date-end">Date End :</label>
            <input
              type={"date"}
              id={"filter-date-end"}
              min={getTodayDate()}
            ></input>
          </div>

          <div className="info-form-box">
            <h3>Time</h3>
            <label htmlFor="filter-time-start">Time Start :</label>
            <input type={"time"} id={"filter-time-start"} />
            <label htmlFor="filter-time-end">Time End :</label>
            <input type={"time"} id={"filter-time-end"} />
          </div>

          <div>
            <h3>Category</h3>
          </div>
          <div className="info-form-box" id="checkbox-eventtype-container">
            <label htmlFor="checkbox-eventtype-container">Event Type : </label>
            <label htmlFor="Online-checkbox">Online</label>
            <input
              type={"checkbox"}
              id="Online-checkbox"
              name="event-type"
              className="checkbox-eventtype"
            />
            <label htmlFor="Onsite-checkbox">On-site</label>
            <input
              type={"checkbox"}
              id="Onsite-checkbox"
              name="event-type"
              className="checkbox-eventtype"
            />
          </div>
          <div className="info-form-box">
            <button
              className="btn btn-success m-3"
              onClick={onClickSubmitFilter}
            >
              <span>Create Event</span>
            </button>
            <button
              className="btn btn-danger m-3"
              onClick={() => props.onClose()}
            >
              <span>Close</span>
            </button>
          </div>
        </form>

        {/* <Modal isOpen={props.mState} onRequestClose={() => props.onClose()}>
        <button className="btn btn-danger ml-3" onClick={() => props.onClose()}>
          <span>Close</span>
        </button> */}
      </Modal>
    </div>
  );
};

export default JoinEventFilterModal;
