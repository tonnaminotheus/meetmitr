import React from "react";
import "./MMheader.css";
import icon from "../asset/icon.png";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import createButt from "../asset/createButton.png";
import chat from "../asset/chatList.png";
import noti from "../asset/notification.png";
import drop from "../asset/dropDownSetting.png";
import { useNavigate } from "react-router-dom";

const MMheader = (props) => {
  const navigate = useNavigate();

  const notificationState = props.notificationState
  const setNotificationModalState = props.setNotificationModalState
  const openNotification=()=>{
    setNotificationModalState(true)
  }

  // const is, setDropDown
  const dropdownState = props.dropdownState
  const setDropdownState = props.setDropdownState
  const openDropdown=()=>{
    setDropdownState(true)
  }

  return (
    //let filterEvent = this.props.events;
    <div className="MMbar">
      <Row>
        <Col>
          <img src={icon} alt="" className="iconImg"></img>
        </Col>
        <Col xs={5} className="feedHead">
          <h1 className="feedHeader">{props.name}</h1>
        </Col>
        <Col>
          {!props.isAdmin && <div className="navButt">
            <img
              src={createButt}
              alt="create"
              className="createButt"
              onClick={() => {
                console.log("clicked");
                navigate("/createEvent");
              }}
            ></img>
            <img
              src={chat}
              alt="chat"
              className="chatList"
              onClick={() => {
                console.log("clicked");
                navigate("/chatList");
              }}
            ></img>
            <img src={noti} 
              alt="noti" 
              className="notification"
              onClick={(event)=>{
                console.log("clicked noti")
                openNotification()
              }}  
            ></img>
            <img src={drop} alt="drop" className="dropSetting" 
            onClick={(event)=>{
                console.log("clicked dropdown")
                openDropdown()
              }}></img>

          </div>}
          {props.isAdmin && (
            <div>
              <button
                className="topRightButt"
                onClick={() => {
                  navigate("/");
                }}
              >
                <span className="topRightText">Logout</span>
              </button>

              <button
                className="topRightButt"
                onClick={() => {
                  navigate(props.toBeNavi);
                }}
              >
                <span className="topRightText">{props.navName}</span>
              </button>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MMheader;
