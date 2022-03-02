import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import "./NotificationModal.css"

const NotificationModal=(props)=>{

    const isModalShow = props.notificationState
    const setNotificationModalState = props.setNotificationModalState
    
    const hideModal=()=>{
        console.log("clicked hide modal")
        setNotificationModalState(false)
    }

    const showModal=()=>{
        setNotificationModalState(true)
    }


    return (
        <div>
            <Modal id="noti-modal" show={isModalShow} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>Might want to Add Something</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={hideModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default NotificationModal;