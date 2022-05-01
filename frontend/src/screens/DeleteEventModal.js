import { useState } from "react"
import { Button, Modal } from "react-bootstrap";

const JoinOrEditButton = styled.button`
background-color: #ffc229;
color: white;
border-radius: 15px;
outline: 0;
border: 0px;
cursor: pointer;
transition: ease background-color 250ms;
height: 77px;
width: 246px;
margin-right: 10px;
margin-left: 0px;
font-size: 30px;
font-weight: bold;
font-family: "Roboto", sans-serif;
align-self: flex-end;
`;
const DeleteEventModal = (props) => {
    
    const isModalShow = props.isAuthenModalOpen
    const setNotificationModalState = props.setAuthenModalOpen
    const userEmail = props.userEmail
    
    const hideModal=()=>{
        setNotificationModalState(false)
    }

    const showModal=()=>{
        setNotificationModalState(true)
    }

    return (
        <Modal className='modal fade' id="delete-event-modal" data-easein={"bounce"} show={isModalShow} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Are You Sure You Want To Delete This Event?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <JoinOrEditButton onClick={hideModal}>Cancle</JoinOrEditButton>
                <JoinOrEditButton onClick={hideModal}>Confirm</JoinOrEditButton>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteEventModal;