import "./modal.css";
import "../components/css_extensions/form_control.css";
import axios from "axios";

import Modal from "react-modal";

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
      datetime_start: document
        .getElementById("filter-date-start")
        .value.concat(
          " ",
          document.getElementById("filter-time-start").value,
          ":00"
        ),
      datetime_end: document
        .getElementById("filter-date-end")
        .value.concat(
          " ",
          document.getElementById("filter-time-end").value,
          ":00"
        ),
      // time_start: document.getElementById("filter-time-start").value,
      // time_end: document.getElementById("filter-time-end").value,
      // is_online: document.getElementById("Online-checkbox").value,
      // is_onsite: document.getElementById("Onsite-checkbox").value,
    };
    console.log(filter_props);
    onFilterSubmit(filter_props);
  };

  Modal.setAppElement("#root");

  console.log(props.mState);

  return (
    // <div method="POST" className="modal">
    <div>
      <Modal
        className="ModalContainer"
        isOpen={props.mState}
        onRequestClose={() => props.onClose()}
        style={{
          overlay: {
            backgroundColor: "rgba(88, 88, 88, 0.5)",
          },
          content: {
            width: "797px",
            height: "848px",

            marginTop: "6vh",
            marginLeft: "auto",
            marginRight: "auto",

            backgroundColor: "#FAF3E7",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "20px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <form onSubmit={onFilterSubmit}>
          <div className="info-form-box">
            <h3>Date</h3>
            <div className="centerBox">
              {/* <label htmlFor="date-start">Date Start :</label> */}
              <input
                type={"date"}
                id={"filter-date-start"}
                min={getTodayDate()}
                className="inputText inputBox"
                style={{ marginRight: "20px" }}
              ></input>

              {/* <label htmlFor="date-end">Date End :</label> */}
              <input
                type={"date"}
                id={"filter-date-end"}
                min={getTodayDate()}
                className="inputText inputBox"
              ></input>
            </div>
          </div>

          <hr />

          <h3>Time</h3>
          <div className="centerBox">
            <div className="info-form-box">
              {/* <label htmlFor="filter-time-start">Time Start :</label> */}
              <input
                type={"time"}
                id={"filter-time-start"}
                className="inputText inputBox"
                style={{ marginRight: "20px" }}
              />
              {/* <label htmlFor="filter-time-end">Time End :</label> */}
              <input
                type={"time"}
                id={"filter-time-end"}
                className="inputText inputBox"
              />
            </div>
          </div>

          <hr />

          {/* <div>
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

          <hr /> */}

          <div className="info-form-box centerBox">
            <button className="closeButt" onClick={() => props.onClose()}>
              <span>Close</span>
            </button>
            <button className="applyButt" onClick={onClickSubmitFilter}>
              <span>Apply</span>
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
