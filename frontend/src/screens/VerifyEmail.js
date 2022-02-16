import "./VerifyEmail.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  let navigate = useNavigate();
  const email = "";
  const goToLogin = () => {
    navigate("/");
  };
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
        <h1>Verify Your Email</h1>
        <p>
          We’ve sent an email to {email} to verify you email address and
          activate your account. The link in the email will expire in 24 hours.
        </p>
        <Button type="Button" onClick={goToLogin}>
          go to login
        </Button>
      </div>
    </div>
  );
}

export default VerifyEmail;
