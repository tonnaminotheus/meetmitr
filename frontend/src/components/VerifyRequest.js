import "./VerifyRequest.css"

import React, { useState, useEffect } from "react";
import axios from "axios";
import globalApi from "../globalApi";

import Cookies from "universal-cookie";
// import Modal from "react-modal";

import { Form } from "react-bootstrap";

const VerifyRequest=(props)=>{
    
    //attr
    const [isAdmin, setAdmin] = useState(false)
    const [requests, setRequests] = useState([])

    //get cookie
    const cookies = new Cookies()
    let user_cookie = cookies.get("cookie");
    let accessToken = user_cookie.accessToken;

    let navigate = useNavigate();
    const toLogin = () => {
        navigate("/");
    };
    
    //getRequests
    const getRequests=()=>{
        useEffect(()=>{
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
            
        },[]);
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
    





}

export default VerifyRequest;