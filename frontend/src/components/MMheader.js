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

const MMheader = () => {
  const navigate = useNavigate();
  return (
    //let filterEvent = this.props.events;
    <div className="MMbar">
      <Row>
        <Col>
          <img src={icon} alt="" className="iconImg"></img>
        </Col>
        <Col xs={5} className="feedHead">
          <h1 className="feedHeader">Event Feed</h1>
        </Col>
        <Col>
          <div className="navButt">
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
                navigate("/chat");
              }}
            ></img>
            <img src={noti} alt="noti" className="notification"></img>
            <img src={drop} alt="drop" className="dropSetting"></img>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MMheader;
