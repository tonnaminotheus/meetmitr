import "./RequestComponent.css";
import "./css_extensions/btn.css";

import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

import { useEffect, useState } from "react";
import axios from "axios";
import globalApi from "../globalApi";

const RequestComponent = (props) => {
  // const [userData, setUserData] = useState({"profileName":"JickWohn", "bio":"ok google", "profilePicUrls":["https://i.redd.it/lgshxkmdoeez.jpg"]})
  let tmp = props.userData;
  tmp["profileName"] = tmp["firstName"] + " " + tmp["lastName"];
  console.log(tmp);

  const [userData, setUserData] = useState(tmp);

  const toVerifyUID = tmp["userId"];

  const [status, setStatus] = useState({ isVerified: false, msg: "verified" });

  const yellowBtnColor = "#FFC229";
  const greyBtnColor = "#535353";

  // console.log((+ false).toString())

  useEffect(() => {
    axios({
      method: "get",
      url: globalApi.userData + toVerifyUID,
      data: {
        userId: `${toVerifyUID}`,
      },
      timeout: 8000,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setUserData(res.data);
        }
      })
      .catch((error) => {
        console.log("error!!");
        console.log(error);
      });
  }, []);

  const requestVerification = (isVerify, Uid) => {
    isVerify = (+isVerify).toString();
    axios({
      method: "post",
      url: globalApi.verifyUser,
      data: {
        userId: `${toVerifyUID}`,
        verify: isVerify,
      },
      timeout: 8000,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data["message"]);
        }
      })
      .catch((error) => {
        console.log("error!!");
        console.log(error.data["message"]);
      });
  };

  const handleAccept = (event) => {
    event.preventDefault();
    setStatus({ isVerified: true, msg: "User Accepted" });

    //api
  };

  const handleReject = (event) => {
    event.preventDefault();
    setStatus({ isVerified: true, msg: "User Rejected" });

    //api
  };

  const getButtons = () => {
    return (
      <div className="verify-btn-container">
        <Button
          className="btn custom-button extra-margin"
          size="lg"
          variant="success"
          onClick={handleAccept}
          style={{
            backgroundColor: yellowBtnColor,
            borderColor: yellowBtnColor,
          }}
        >
          Accept
        </Button>

        <Button
          className="btn custom-button extra-margin"
          size="lg"
          variant="danger"
          onClick={handleReject}
          style={{
            backgroundColor: greyBtnColor,
            borderColor: greyBtnColor,
          }}
        >
          Reject
        </Button>
      </div>
    );
  };

  const getReqMsg = () => {
    return (
      <div className="verify-btn-container">
        <p style={{ fontSize: "30px" }}>{status.msg}</p>
      </div>
    );
  };

  return (
    <div className="request-container">
      <Row>
        <Col md="auto" className="col-left">
          <Image
            className={"showAdminProfilePic"}
            roundedCircle={true}
            src={tmp["displayPic"]}
          ></Image>
        </Col>
        <Col className="col-center">
          <p style={{ fontSize: "xx-large", fontWeight: "bolder" }}>
            {userData.profileName}
          </p>
          <p style={{ fontSize: "large", fontWeight: "bold" }}>
            {userData.bio}
          </p>
        </Col>
        <Col md="auto" className="col-right">
          {!status.isVerified && getButtons()}
          {status.isVerified && getReqMsg()}
        </Col>
      </Row>
    </div>
  );
};

export default RequestComponent;
