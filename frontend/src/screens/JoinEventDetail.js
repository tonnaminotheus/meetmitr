import "./JoinEventDetail.css";
import styled from "styled-components";
import React, { useEffect } from "react";
import moment from "moment";
import axios from "axios";
import globalApi from "../globalApi";
import ImageGallery from "react-image-gallery";
import { useLocation, useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";
import Participant from "../components/Participant";

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
const JoinedButton = styled.button`
  background-color: #d9d9d9;
  color: #000000;
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

function JoinEventDetail(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  var cookies = new Cookie();
  var userData = cookies.get("cookie");
  const [show, setShow] = React.useState([true, false, false]);
  const [attendance, setAttendance] = React.useState(0);
  const [progressData, setProgressData] = React.useState("50%");
  const [joined, setJoined] = React.useState(false);
  const [owner, setOwner] = React.useState(false);
  const [images, setImages] = React.useState([]);
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
    creatorName: "JackDeBuff",
    creatorImage: "imgUrl",

    participants: ["PRyuSudHod", "PRyuSudTae"],
  });
  const [participants, setParticipants] = React.useState([]);

  const joinEvent = () => {
    axios({
      method: "POST",
      url: globalApi.joinEvent + eventData.eventId,
      headers: {
        authorization: userData.accessToken,
      },
    })
      .then((respond) => {
        setJoined(true);
        const nAttenNum = attendance + 1;
        const percent =
          String((nAttenNum / eventData.maxParticipant) * 100) + "%";
        setAttendance(nAttenNum);
        setProgressData(percent);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  useEffect(() => {
    axios({
      method: "GET",
      url: globalApi.eventDescription + state.eventId,
      headers: {
        authorization: "Bearer " + userData.accessToken,
      },
    })
      .then((respond) => {
        setOwner(respond.data.creatorId === userData.userID);
        var attenNum = 0;
        if (respond.data.participants) {
          attenNum = respond.data.participants.length;
        }
        const percent =
          String((attenNum / respond.data.maxParticipant) * 100) + "%";

        setEventData(respond.data);
        setAttendance(attenNum);
        setProgressData(percent);
        setJoined(respond.data.isJoin);
        var imageList = [];
        console.log(respond.data.imagUrl);
        for (const image of respond.data.imagUrl) {
          imageList.push({
            original: image,
            originalHeight: "1000px",
          });
        }
        setImages(imageList);
        var participantList = [];
        for (var i = 0; i < respond.data.participantsId.length; i++) {
          participantList.push({
            id: respond.data.participantsId[i],
            image: respond.data.participantsImage[i],
          });
        }
        setParticipants(participantList);
        console.log(imageList);
        console.log(respond.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="joinContainer">
      <div className="pic">
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={false}
          useBrowserFullscreen={false}
          showThumbnails={false}
          autoPlay={true}
          showBullets={true}
          showNav={true}
          useTranslate3D={false}
          style={{
            display: "flex",
            backgroundImage:
              "linear-gradient(to right,transparent,100px,transparent,70%,#faf3e7)",
            backgroundSize: "cover",
            flex: "4",
          }}
        />
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
            <img className="host" src={eventData.creatorImage} alt="" />
            <p>
              {eventData.creatorName} is <span>Host!</span>
            </p>
          </div>
        </div>
        <div className="status">
          <div className="joinButton">
            <p>Price : {eventData.price} Coin</p>

            {owner && (
              <JoinOrEditButton
                type="submit"
                onClick={() => {
                  navigate("/editEvent", {
                    state: { eventId: eventData.eventId },
                  });
                }}
              >
                Edit
              </JoinOrEditButton>
            )}
            {!owner && (
              <div>
                {joined && (
                  <JoinedButton
                    type="submit"
                    onClick={() => {
                      setJoined(false);
                      const nAttenNum = attendance - 1;
                      const percent =
                        String((nAttenNum / eventData.maxParticipant) * 100) +
                        "%";
                      setAttendance(nAttenNum);
                      setProgressData(percent);
                    }}
                    onMouseEnter={() => {
                      console.log("eventId is " + eventData.eventId);
                    }}
                  >
                    Joined
                  </JoinedButton>
                )}
                {!joined && (
                  <JoinOrEditButton
                    type="submit"
                    onClick={joinEvent}
                    onMouseEnter={() => {
                      console.log("eventId is " + eventData.eventId);
                    }}
                  >
                    Join
                  </JoinOrEditButton>
                )}
              </div>
            )}
          </div>
          <div className="attendances">
            <p>
              Attendances: {attendance} / {eventData.maxParticipant}
            </p>
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
              ></div>
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
            {show[2] && (
              <p>
                {participants.map((item) => {
                  return (
                    <Participant id={item.id} participantImage={item.image} />
                  );
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinEventDetail;
