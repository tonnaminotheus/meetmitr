import "./modal.css";
import "../components/css_extensions/form_control.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import globalApi from "../globalApi";

import Cookies from "universal-cookie";
import Modal from "react-modal";

// import { Button } from 'react-bootstrap';
import { Form } from "react-bootstrap";

const JoinEventFilterModal = (props) => {
  // const onFilterSubmit = props.onFilterSubmit;
  const [time, setTime] = useState({});
  const cookies = new Cookies();
  console.log(cookies.get("cookie"));
  var userData = cookies.get("cookie");
  const [submitted, setSubmitted] = useState(0);
  let numPage = 1;

  useEffect(() => {
    console.log("run useEffect");
    console.log(submitted);
    axios({
      method: "post",
      url: globalApi.getFilteredEvent + String(numPage),
      headers: {
        authorization: "Bearer " + userData.accessToken,
      },
      data: time,
    })
      .then(function (response) {
        if (submitted > 0) {
          console.log("modal recieve data");
          console.log(response.data);
          props.setEvent(response.data);
        }
      })
      .catch(function (error) {
        console.log("error!!");
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [submitted]);

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
    console.log("click apply butt");
    event.preventDefault();
    const filter_props = {
      "startTime": document
        .getElementById("filter-date-start")
        .value.concat(
          " ",
          document.getElementById("filter-time-start").value,
          ":00"
        ),
      "endTime": document
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
    props.setMState(false);
    setTime(filter_props);
    console.log(filter_props);
    setSubmitted(submitted + 1);
    console.log(submitted);
    // onFilterSubmit(filter_props);
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
        <div className="info-form-box">
          <h3>Date</h3>
          <div className="centerBox">
            {/* <label htmlFor="date-start">Date Start :</label> */}
            <input
              type={"date"}
              id={"filter-date-start"}
              // min={getTodayDate()}
              className="inputText inputBox"
              style={{ marginRight: "20px" }}
            ></input>

            {/* <label htmlFor="date-end">Date End :</label> */}
            <input
              type={"date"}
              id={"filter-date-end"}
              // min={getTodayDate()}
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

        {/* <Modal isOpen={props.mState} onRequestClose={() => props.onClose()}>
        <button className="btn btn-danger ml-3" onClick={() => props.onClose()}>
          <span>Close</span>
        </button> */}
      </Modal>
    </div>
  );
};

export default JoinEventFilterModal;
