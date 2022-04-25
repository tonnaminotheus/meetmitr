import "./RequestComponent.css"
import "./css_extensions/btn.css"

import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from 'react-bootstrap/Image'

import { useEffect, useState } from "react";
import axios from "axios";
import globalApi from "../globalApi";

const RequestComponent=(props)=>{
    
    const toVerifyUID = props.userID
    const [userData, setUserData] = useState({"profileName":"JickWohn", "bio":"ok google", "profilePicUrls":["https://i.redd.it/lgshxkmdoeez.jpg"]})

    const [status, setStatus] = useState({"isVerified":false, "msg":"verified"})

    useEffect(()=>{
        axios({
            method: 'get',
            url: globalApi.userData,
            data: {
                "userId" : `${toVerifyUID}`,
            },
            timeout: 8000
        })
        .then((res)=>{
            if (res.status === 200) {
                console.log(res.data)
                setUserData(res.data)
            }
        })
        .catch(error => {
            console.log("error!!")
            console.log(error)
        })
        
    },[]);

    const handleAccept=(event)=>{
        event.preventDefault();
    }

    const handleReject=(event)=>{
        event.preventDefault();
    }
    
    const getButtons=()=>{
        return (
        <div className="verify-btn-container">
            <Button
                className="btn custom-button"
                variant="success"
                onClick={handleAccept}>
                Accept
            </Button>

            <Button
                className="btn custom-button"
                variant="danger"
                onClick={handleReject}>
                Reject
            </Button>
        </div>
        );
    }

    const getReqMsg = () => {
        return (
            <div>
                <p>{status.msg}</p>
            </div>
        )
    }


    return (
    <div className="request-container">
        <Row>
            <Col md="auto" className="col-left">
                <Image className={"showAdminProfilePic"} roundedCircle={true} src={userData["profilePicUrls"][0]}></Image>
            </Col>
            <Col className="col-center">
                <p style={{"fontSize": "xx-large","fontWeight":"bolder"}}>{userData.profileName}</p>
                <p style={{"fontSize": "large","fontWeight":"bold"}}>{userData.bio}</p>
            </Col>
            <Col md="auto" className="col-right">
                {!status.isVerified && getButtons()}
                {status.isVerified && getReqMsg()}
            </Col>
        </Row>
    </div>
    );
}

export default RequestComponent;

