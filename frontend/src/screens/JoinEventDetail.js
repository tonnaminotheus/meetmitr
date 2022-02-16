import "./JoinEventDetail.css";
import styled from "styled-components";
import host from "../asset/naemblack.jpg";
import logo from "../asset/icon.png";
import React, { useEffect } from "react";
import moment from "moment";
import axios from "axios";
import globalApi from "../globalApi";
import globalVar from "../cookie";
import { useLocation } from "react-router-dom";

function JoinEventDetail() {
  const { state } = useLocation();
  const [show, setShow] = React.useState([true, false, false]);
  const [attendance, setAttendance] = React.useState(0);
  const [progressData, setProgressData] = React.useState("50%");
  const [hostData, setHostData] = React.useState({
    userId: 1,
    email: "test@gmail.com",
    gender: "unspecified",
    profileName: "jack",
    bio: "",
    birthdate: "2000-11-23",
    firstName: "ryuio",
    middleName: "ioio",
    lastName: "ryuryu",
    numberOfPenalty: 0,
    profilePicUrl: "",
  });
  const [eventData, setEventData] = React.useState({
    eventId: 2,
    name: "What",
    description: "Yamete Iyaaaa!",
    tags: ["Game", "Anime", "Charity"],
    address: "test address",
    province: "Samut Prakarn",
    imagUrl: "",
    startTime: "2021-11-23 23:22:22",
    endTime: "2021-11-25 23:22:22",
    onsite: false,
    maxParticipant: 10,
    price: 0,
    createdTimeStamp: "2022-02-13 07:56:41",
    creatorId: 1,
    participants: ["PRyuSudHod", "PRyuSudTae"],
  });
  const JoinOrEditButton = styled.button`
    background-color: #ffc229;
    color: white;
    border-radius: 15px;
    outline: 0;
    border: 0px;
    cursor: pointer;
    transition: ease background-color 250ms;
    height: 77px;
    width: 246px;
    margin-right: 10px;
    margin-left: 0px;
    font-size: 30px;
    font-weight: bold;
    font-family: "Roboto", sans-serif;
    align-self: flex-end;
  `;
  const SelectedTabbarButton = styled.button`
    background-color: transparent;
    color: #000000;
    outline: 0;
    cursor: pointer;
    transition: ease background-color 250ms;
    height: 50px;
    width: 175px;
    margin-right: 0px;
    margin-left: 0px;
    border-bottom: 3px solid #ffcc4d;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    font-size: 25 px;
    font-weight: bold;
    font-family: "Roboto", sans-serif;
  `;
  const UnSelectedTabbarButton = styled.button`
    background-color: transparent;
    color: #8b8b8b;
    outline: 0;
    cursor: pointer;
    transition: ease background-color 250ms;
    height: 50px;
    width: 175px;
    margin-right: 0px;
    margin-left: 0px;
    border-bottom: 1px solid #575757;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    font-size: 25 px;
    font-weight: bold;
    font-family: "Roboto", sans-serif;
  `;
  useEffect(() => {
    axios({
      method: "GET",
      url: globalApi.eventDescription + state.eventId,
    })
      .then((respond) => {
        const attenNum = respond.data.participants.length;
        const percent =
          String((attenNum / respond.data.maxParticipant) * 100) + "%";
        console.log(attenNum);
        console.log(percent);

        setEventData(respond.data);
        setAttendance(attenNum);
        setProgressData(percent);

        const hostId = respond.data.creatorId;
        axios({
          method: "GET",
          url: globalApi.userData + hostId,
        })
          .then((respond) => {
            setHostData(respond.data);
          })
          .catch((error) => {});
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="joinContainer">
      <div className="pic">
        <img className="logo" src={logo} alt="" />
      </div>
      <div className="detail">
        <div className="header">
          <div className="header-left">
            <h1>{eventData.name}</h1>
            <p>
              {moment(eventData.startTime).format("DD MMMM h:mm")} -{" "}
              {moment(eventData.endTime).format("DD MMMM h:mm")}
            </p>
          </div>
          <div className="header-right">
            <img className="host" src={host} alt="" />
            <p>
              {hostData.profileName} is <span>Host!</span>
            </p>
          </div>
        </div>
        <div className="status">
          <div className="joinButton">
            <p>Price : {eventData.price} Coin</p>
            {globalVar.UserID !== eventData.creatorId && (
              <JoinOrEditButton type="submit">Join</JoinOrEditButton>
            )}
            {globalVar.UserID === eventData.creatorId && (
              <JoinOrEditButton type="submit">Edit</JoinOrEditButton>
            )}
          </div>
          <div className="attendances">
            <p>Attendances:</p>
            <div className="progressContainer">
              <div
                className="progress"
                style={{
                  display: "flex",
                  background: "linear-gradient(to left, #FF937C, #F8CE6C)",
                  width: progressData,
                  height: "100%",
                  borderRadius: "15px",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <p>
                  {attendance} / {eventData.maxParticipant}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="tabbar">
          <div className="tabbar-header">
            <div className="tabbar-button">
              {show[0] && (
                <SelectedTabbarButton type="Button">About</SelectedTabbarButton>
              )}
              {!show[0] && (
                <UnSelectedTabbarButton
                  type="Button"
                  onClick={() => {
                    setShow([true, false, false]);
                  }}
                >
                  About
                </UnSelectedTabbarButton>
              )}
              {show[1] && (
                <SelectedTabbarButton type="Button">
                  Location
                </SelectedTabbarButton>
              )}
              {!show[1] && (
                <UnSelectedTabbarButton
                  type="Button"
                  onClick={() => {
                    setShow([false, true, false]);
                  }}
                >
                  Location
                </UnSelectedTabbarButton>
              )}
              {show[2] && (
                <SelectedTabbarButton type="Button">
                  Attendances
                </SelectedTabbarButton>
              )}
              {!show[2] && (
                <UnSelectedTabbarButton
                  type="Button"
                  onClick={() => {
                    setShow([false, false, true]);
                  }}
                >
                  Attendances
                </UnSelectedTabbarButton>
              )}
            </div>
          </div>
          <div className="tabbar-detail">
            {show[0] && <p>{eventData.description}</p>}
            {show[1] && <p>{eventData.address}</p>}
            {show[2] && <p>{eventData.participants}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinEventDetail;
