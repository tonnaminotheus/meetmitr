import globalApi from "../globalApi";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const cookies = new Cookies();
  const getButton = () => {
    let profileId = props.userId;
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
            Edit Profile
          </button>
        </div>
      );
    }
  };
  const shootAPIUser = () => {
    axios({
      method: "get",
      url: globalApi.userData + `${props.userId}`,
    })
      .then(function (response) {
        console.log(response.data);
        setImage(response.data.profilePicUrl);
        setBio(response.data.bio);
        setProfileName(`${response.data.profileName}`);
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
              <text
                style={{ fontFamily: "Roboto", fontSize: 70, marginLeft: 16 }}
              >
                ...
              </text>
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
