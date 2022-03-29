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

    const customStyles = {
        content: {
        // position: "fixed",
        top: "15%",
        right: "2%",
        width: "25%",
        bottom: 'auto',
        left: "auto",
        // marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        },
      };

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
                console.log("ok herble")
                console.log(res)
                setNotiCount(res.data.count)
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

    useEffect(()=>{
        axios({
            method: 'get',
            url: globalApi.getAllNoti, //friend noti endpoint
            headers: {
                "Authorization" : "Bearer "+user_cookie.accessToken,
            },
            timeout: 8000
        })
        .then((res)=>{
            if (res.status == 200) {
                console.log("ok herble")
                console.log(res)
                setNoti(all_noti.concat(res.data.noti))
            }
        })
        .catch((error) => {
            console.log("error!!")
            console.log(error)
        })
    },[])

    // {Object.keys(this.props.events).length !== 0 &&
    //     Object.keys(this.props.events).map((key, index) => (
    //       <EventCard
    //         key={this.props.events[key].eventId}
    //         events={this.props.events[key]}
    //       />
    //     ))}


    return (
        <div>
            {/* <Modal className='modal fade' id="noti-modal" animation={true} data-easein="bounce" show={isModalShow} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {all_noti.length > 0 && all_noti.map((noti)=>{
                        return <NotiBox noti={noti}/>
                    })}
                    {all_noti.length <= 0 && <p>No new notifications</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn custom-button'variant="success" onClick={hideModal}>Close</Button>
                </Modal.Footer>
            </Modal> */}

            <Modal
                closeTimeoutMS={200}
                isOpen={isModalShow}
                contentLabel="modal"
                onRequestClose={() => hideModal}
                style={customStyles}
            >
                {all_noti.length > 0 && all_noti.map((noti)=>{
                        return <NotiBox noti={noti}/>
                })}
                {all_noti.length <= 0 && <p>No new notifications</p>}
                <Button className='btn custom-button'variant="success" onClick={hideModal}>Close</Button>
            </Modal>
        </div>
    );

}

export default NotificationModal;