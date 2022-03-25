import { useState } from "react"
import { Button, Modal } from "react-bootstrap";
import "./AuthenLoginModal.css"

const AuthenLoginModal = (props) => {
    
    const isModalShow = props.isAuthenModalOpen
    const setNotificationModalState = props.setAuthenModalOpen
    const userEmail = props.userEmail
    
    const hideModal=()=>{
        console.log("clicked hide modal")
        setNotificationModalState(false)
    }

    const showModal=()=>{
        setNotificationModalState(true)
    }

    const getMsg=(userEmail)=>{
        let idx = userEmail.indexOf("@")
        if (userEmail.length <= 2 || idx <= 0) {
            console.log("error email")
            return ""
        }
        let msg = userEmail[0] + "*".repeat(idx-1) + userEmail.slice(idx)
        console.log(`email ok ${msg}`)
        return msg
    }

    return (
        <Modal className='modal fade' id="authen-login-modal" data-easein={"bounce"} show={isModalShow} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Please Verify Your Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`We’ve sent an email to ${getMsg(userEmail)} to verify your identity. The link in the email will expire in 10 minutes.`}
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn custom-button'variant="success" onClick={hideModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AuthenLoginModal;