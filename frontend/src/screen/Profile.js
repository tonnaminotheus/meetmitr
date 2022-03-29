import globalApi from "../globalApi";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import icon from "../asset/icon.png";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import naem from "../asset/naemblack.jpg";
import React from "react";
import "./Profile.css";
var axios = require("axios").default;

const Profile = (props) => {
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [profileName, setProfileName] = useState("");
  const [dmID, setDmID] = useState(0);
  const [userId, setUserId] = useState(0);
  const { state } = useLocation();
  console.log("state profile: ", state);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const getButton = () => {
    let profileId = state.userId;
    let currentUserId = cookies.get("cookie").userID;
    if (profileId === currentUserId) {
      console.log("Hey");
      return (
        <button
          style={{
            width: 210,
            height: 59,
            fontFamily: "Roboto",
            fontSize: 36,
            backgroundColor: "#FFC229",
            color: "white",
            borderRadius: 11,
            marginLeft: 16,
            borderWidth: 0,
          }}
          onClick={() => {
            navigate("/editProfile");
          }}
        >
          Edit Profile
        </button>
      );
    } else {
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button
            style={{
              width: 192,
              height: 59,
              fontFamily: "Roboto",
              fontSize: 30,
              backgroundColor: "#FFC229",
              color: "white",
              borderRadius: 11,
              marginLeft: 16,
              borderWidth: 0,
            }}
            onClick={() => {
              navigate("/chat", {
                state: {
                  userId: profileId,
                  dmId: dmID,
                  profileName: profileName,
                  imgUrl: image,
                },
              });
            }}
          >
            Message
          </button>

          <button
            style={{
              width: 192,
              height: 59,
              fontFamily: "Roboto",
              fontSize: 30,
              backgroundColor: "#FFC229",
              color: "white",
              borderRadius: 11,
              marginLeft: 16,
              borderWidth: 0,
            }}
          >
            Add Friend
          </button>
        </div>
      );
    }
  };
  const shootAPIUser = () => {
    axios({
      method: "get",
      url: globalApi.userData + `${state.userId}`,
    })
      .then(function (response) {
        console.log(response.data);
        setImage(response.data.displayPic);
        setBio(response.data.bio);
        setProfileName(`${response.data.profileName}`);
        setUserId(response.data.userId);
        //redirect
      })
      .catch(function (error) {
        console.log("error!!");
        console.log(error.response);
      })
      .then(function () {
        // always executed
      });
    console.log(
      "TOKEN LINK PROFILE ",
      globalApi.chatToken + `dm/${state.userId}`
    );
    axios({
      method: "get",
      url: globalApi.chatToken + `dm/${state.userId}`,
      headers: {
        Authorization: "Bearer " + cookies.get("cookie").accessToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setDmID(response.data.DMId);
        //redirect
      })
      .catch(function (error) {
        console.log("error!!");
        console.log(error.response);
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    shootAPIUser();
    console.log(cookies.get("cookie").userID);
  }, []);
  let button = getButton();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="MMbar">
        <Row>
          <Col>
            <img src={icon} alt="" className="iconImg"></img>
          </Col>
        </Row>
      </div>
      <div style={{ backgroundColor: "#faf3e7", height: 845 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 32,
            marginLeft: 64,
            alignItems: "center",
          }}
        >
          <img
            src={image == "" ? naem : image}
            style={{
              width: 317,
              height: 317,
              borderRadius: 317,
              borderWidth: 4,
              borderColor: "black",
              borderStyle: "solid",
              marginRight: 32,
            }}
          ></img>
          <div
            className="ProfileDesc"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <text
                style={{ fontFamily: "Roboto", fontSize: 72, marginRight: 32 }}
              >
                {profileName == "" ? "user" : profileName}
              </text>
              {button}
            </div>

            <text style={{ fontFamily: "Roboto", fontSize: 36 }}>
              {bio == "" ? "No Bio" : bio}
            </text>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: 1750,
              borderWidth: 1,
              borderColor: "black",
              borderStyle: "solid",
              height: 1,
              alignSelf: "center",
              marginTop: 64,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
