import { useEffect, useState } from 'react';

// import Modal from 'react-bootstrap/Modal'
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import { Button } from 'react-bootstrap';
import "./NotificationModal.css"
import Cookies from 'universal-cookie';
import globalApi from '../../globalApi';

import NotiBox from "./NotiBox"

import "../css_extensions/btn.css"

var axios = require("axios").default;

const NotificationModal=(props)=>{

    const cookies = new Cookies();
    const user_cookie = cookies.get("cookie")

    const isModalShow = props.notificationState
    const setNotificationModalState = props.setNotificationModalState

    const [all_noti,setNoti] = useState([])

    const [noti_count,setNotiCount] = useState(0)
    
    const hideModal=()=>{
        console.log("clicked hide modal")
        setNotificationModalState(false)
    }

    const showModal=()=>{
        setNotificationModalState(true)
    }

    const toggleModal=()=>{
        setNotificationModalState(!isModalShow)
    }

    // const customStyles = {
    //     content: {
    //     position: "fixed",
    //     top: "20%",
    //     right: "-10%",
    //     width: "25%",
    //     bottom: 'auto',
    //     left: "auto",
    //     marginRight: '0px',
    //     transform: 'translate(-50%, -50%)',
    //     "background-color": "#FAF3E7"
    //     },
    //   };

    const customStyles={
        overlay: {
          backgroundColor: "rgba(88, 88, 88, 0.1)",
        },
        content: {
          width: "25%",
          height: "auto",

          marginTop: "5vh",
          marginLeft: "auto",
          marginRight: "1vh",

          backgroundColor: "#FAF3E7",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "20px",
          outline: "none",
          padding: "20px",
        },
      }

      

    // get noti count 
    useEffect(()=>{
        axios({
            method: 'get',
            url: globalApi.getNotiCount, // noti count endpoint
            headers: {
                "Authorization" : "Bearer "+user_cookie.accessToken,
            },
            timeout: 8000
        })
        .then((res)=>{
            if (res.status == 200) {
                console.log("count noti ok")
                console.log(res.data.noti)
                setNotiCount(parseInt(res.data.noti))
                // setNotiCount(3)
                console.log("noti_count", noti_count)
                
            }
        })
        .catch((error) => {
            console.log("error!!")
            console.log(error)
        })
    },[])

    useEffect(()=>{
        axios({
            method: 'get',
            url: globalApi.getAllNoti,
            headers: {
                "Authorization" : "Bearer "+user_cookie.accessToken,
            },
            timeout: 8000
        })
        .then((res)=>{
            if (res.status == 200) {
                console.log("ok herble")
                console.log(res)
                setNoti(res.data.noti)
            }
        })
        .catch((error) => {
            console.log("error!!")
            console.log(error)
        })
    },[])

    // join event noti

    // useEffect(()=>{
    //     axios({
    //         method: 'get',
    //         url: globalApi.getAllNoti, //friend noti endpoint
    //         headers: {
    //             "Authorization" : "Bearer "+user_cookie.accessToken,
    //         },
    //         timeout: 8000
    //     })
    //     .then((res)=>{
    //         if (res.status == 200) {
    //             console.log("ok herble")
    //             console.log(res)
    //             setNoti(all_noti.concat(res.data.noti))
    //         }
    //     })
    //     .catch((error) => {
    //         console.log("error!!")
    //         console.log(error)
    //     })
    // },[])

    // {Object.keys(this.props.events).length !== 0 &&
    //     Object.keys(this.props.events).map((key, index) => (
    //       <EventCard
    //         key={this.props.events[key].eventId}
    //         events={this.props.events[key]}
    //       />
    //     ))}


    return (
        <div>
            <Modal
                closeTimeoutMS={200}
                isOpen={isModalShow}
                contentLabel="modal"
                onRequestClose={() => hideModal}
                style={customStyles}
            >
                <div className='modal_header'>
                    <h3>Notifications <Button className='btn custom-button'variant="info" style={{"position": "relative", "float": "right", "top":"0", "margin-top":"0"}}>{noti_count}</Button></h3>
                </div>
                {all_noti.length > 0 && all_noti.map((noti, index)=>{
                        return <NotiBox key={index} noti={noti}/>
                })}
                {all_noti.length <= 0 && <NotiBox noti={{
                    "notiContent" : "No new Notifications",
                    "url" : "/",
                    "dateTime" : "2021-11-23 23:22:00"
                }}
                />}

                <div style={{"position": "absolute", "bottom": "0", "right": "0", "margin": "10px"}}><Button className='btn custom-button'variant="success" onClick={hideModal}>Close</Button></div>
            </Modal>
        </div>
    );

}

export default NotificationModal;