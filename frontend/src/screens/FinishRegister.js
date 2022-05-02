import "./FinishRegister.css";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import globalApi from "../globalApi";

function FinishRegister() {
  let navigate = useNavigate();
  let { activateStr } = useParams();
  const [name, setName] = useState("");
  const goToLogin = () => {
    navigate("/");
  };
  useEffect(() => {
    axios({
      method: "POST",
      url: globalApi.activate + activateStr,
    })
      .then((respond) => {
        setName(respond.data.firstName);
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  }, []);
  const Button = styled.button`
    background-color: #303b5b;
    color: white;
    border-radius: 15px;
    border: 0;
    outline: 0;
    cursor: pointer;
    transition: ease background-color 250ms;
    height: 72px;
    width: 360px;
    margin-right: 75px;
    margin-left: 0px;
    font-size: 30px;
    font-weight: bold;
    font-family: "Roboto", sans-serif;
    align-self: flex-end;
  `;
  return (
    <div className="Register">
      <div className="register-container">
        <h1>Thank for registration {name}</h1>
        <p>Please go to login to use features in MeetMitr.</p>
        <Button type="Button" onClick={goToLogin}>
          go to login
        </Button>
      </div>
    </div>
  );
}

export default FinishRegister;
