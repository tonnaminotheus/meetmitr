import "./FinishRegister.css";
import styled from "styled-components";

function FinishRegister() {
  const email = "";
  const goToLogin = () => {};
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
        <h1>Thank for registration</h1>
        <p>Please go to login to use features in MeetMitr.</p>
        <Button type="Button" onClick={goToLogin}>
          go to login
        </Button>
      </div>
    </div>
  );
}

export default FinishRegister;
