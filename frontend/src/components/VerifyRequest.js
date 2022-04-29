import "./VerifyRequest.css"

import React, { useState, useEffect } from "react";
import axios from "axios";
import globalApi from "../globalApi";

import Cookies from "universal-cookie";
// import Modal from "react-modal";

import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

import RequestComponent from "./RequestComponent";
import MMheader from "./MMheader";

const VerifyRequest=(props)=>{
    
    //attr
    const [isAdmin, setAdmin] = useState(false)
    const [requests, setRequests] = useState([])

    const [notificationState, setNotificationModalState] = useState(false);

    //get cookie
    const cookies = new Cookies()
    let user_cookie = cookies.get("cookie");
    let accessToken = user_cookie.accessToken;
    // let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiYXV0aG9yaXplZCI6dHJ1ZSwiZXhwIjoxNjUzNjI3NDc2fQ.9ZoVhVFMYxfweHRAu4B8J4naN7GMgRI69oP9gUpnbgg"

    let navigate = useNavigate();
    const toLogin = () => {
        navigate("/");
    };
    
    //getRequests
    const getRequests=()=>{
        axios({
            method: 'get',
            url: globalApi.getRequests,
            headers: {
                "Authorization" : "Bearer "+accessToken,
            },
            timeout: 8000
        })
        .then((res)=>{
            if (res.status == 200) {
                console.log(res.data["requests"])
                setRequests(res.data["requests"])
            }
            else console.log(res.status);
            
        })
        .catch(error => {
            console.log("error!!")
            console.log(error)
        })
    }

    //check isAdmin
    useEffect(()=>{
        axios({
            method: 'get',
            url: globalApi.isAdmin,
            headers: {
                "Authorization" : "Bearer "+accessToken,
            },
            timeout: 8000
        })
        .then((res)=>{
            if (res.status != 200) {
                toLogin()
            }
            else {
                setAdmin(true)
                getRequests()
            }
        })
        .catch(error => {
            console.log("error!!")
            console.log(error)
        })
        
    },[]);

    //getAllRequest


    return (
        <div className="backG">
            <MMheader
                name="Verify Request"
                navName="Manage Event"
                toBeNavi="/feed"
                isAdmin={true}
                notificationState={notificationState}
                setNotificationModalState={setNotificationModalState}
            />
            <div className="verify-page-container">
                {/* <RequestComponent/> */}
                {requests.length > 0 && requests.map((req, index)=>{
                  return <RequestComponent key={index} userData={req}/>
                })}
                {requests.length === 0 && <p style={{"fontSize" : "30px"}}>No Requests From Users</p>}
                {/* Stack */}
            </div>
        </div>
    )
    





}

export default VerifyRequest;