import { useEffect, useState } from "react";

// import Modal from 'react-bootstrap/Modal'
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import { Button, Col, Row } from "react-bootstrap";
import Cookies from "universal-cookie";
import globalApi from "../../globalApi";
import { useNavigate } from "react-router-dom";

import "./Dropdown.css"
import "../css_extensions/btn.css"



var axios = require("axios").default;

const Dropdown=(props)=>{

    const navigate = useNavigate();

    const cookies = new Cookies();
    const user_cookie = cookies.get("cookie")

    const isModalShow = props.dropdownState
    const setDropdown = props.setDropdownState
    
    const hideModal=()=>{
        console.log("clicked hide modal")
        setDropdown(false)
    }

    const showModal=()=>{
        setDropdown(true)
    }

    const toggleModal=()=>{
        setDropdown(!isModalShow)
    }

    const toPersonalQuiz=()=>{
        hideModal()
        navigate("/quiz")
    }

    const verify=(event)=>{
        event.preventDefault()
        axios({
            method: 'post',
            url: globalApi.veriRequest,
            headers: {
                "Authorization" : "Bearer "+user_cookie.accessToken,
            },
            timeout: 8000
        })
        .then((res)=>{
            if (res.status == 200) {
                console.log("ok")
                console.log(res.data)
            }
        })
        .catch((error) => {
            console.log("error!!")
            console.log(error)
        })

        hideModal()
    }

    const logout=()=>{
        console.log("logout")
        hideModal()
        navigate("/")
    }


    const customStyles={
        overlay: {
          backgroundColor: "rgba(88, 88, 88, 0.1)",
        },
        content: {
          width: "25%",
          height: "30%",

          marginTop: "5vh",
          marginLeft: "auto",
          marginRight: "1vh",

          backgroundColor: "#FAF3E7",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "20px",
          outline: "none",
          padding: "30px",
          paddingLeft: "40px",
          paddingRight: "40px"
        },
      }




    return (
      <div>
        <Modal
        closeTimeoutMS={200}
        isOpen={isModalShow}
        contentLabel="modal"
        onRequestClose={hideModal}
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
        >
        {/* <div style={{"margin":"10px"}}> */}
        <div>
            <Col>
                <Row className="dropdown-row">
                    <Button
                        className="btn dropdown-btn"
                        variant="warning"
                        onClick={toPersonalQuiz}
                    >Personality Quiz
                    </Button>
                </Row>
                <Row className="dropdown-row">
                    <Button
                        className="btn dropdown-btn"
                        variant="warning"
                        onClick={verify}
                    >Verify
                </Button>
                </Row>
                <Row className="dropdown-row">
                    <Button
                        className="btn dropdown-btn"
                        variant="danger"
                        onClick={logout}
                    >Logout
                    </Button>
                </Row>
            </Col>
        </div>
        </Modal>
      </div>
  );
};

export default Dropdown;
