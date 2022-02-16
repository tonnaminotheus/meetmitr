import "./Register.css";
import yellowlogo from "../asset/iconyellow.png";
import { useState } from "react";
import styled from "styled-components";
import moment from "moment";

function Register() {
  const [agreeTerm, setAgreeTerm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("M");
  const [birthDate, setBirthDate] = useState(moment().format("yyyy-MM-DD"));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleAgreeTerm = () => {
    setAgreeTerm(!agreeTerm);
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const submitRegister = () => {
    console.log("firstName:", firstName);
    console.log("lastName:", lastName);
    console.log("email:", email);
    console.log("gender:", gender);
    console.log("birthDate:", birthDate);
    console.log("password:", password);
    console.log("confirmPassword:", confirmPassword);
  };
  const Button = styled.button`
    background-color: #303b5b;
    color: white;
    border-radius: 15px;
    outline: 0;
    cursor: pointer;
    box-shadow: 0px 2px 2px lightgray;
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
  const Select = styled.select`
    width: 110px;
    height: 65px;
    background: white;
    color: #000000;
    padding-left: 5px;
    margin-right: 15px;
    font-size: 30px;
    font-weight: bold;
    font-family: "Titillium Web";
    border: 2px solid #c4c4c4;
    border-radius: 10px;
    option {
      color: black;
      background: white;
      display: flex;
      white-space: pre;
      min-height: 20px;
      padding: 0px 2px 1px;
    }
  `;
  const register = () => {};
  return (
    <div className="Register">
      <div className="register-container">
        <div className="register-header">
          <div class="logo">
            <img className="yellowlogo" src={yellowlogo} alt="" />
          </div>
          <div class="createAccount">
            <p>Create Account</p>
          </div>
          <div class="Empty" style={{ flex: 1 }} />
          <div class="Login">
            <p>Back to Log in?</p>
          </div>
        </div>
        <div className="register-body">
          <div class="left-register-form">
            <div class="field">
              <p>First Name</p>
              <input
                type="text"
                placeholder=""
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div class="field">
              <p>Email Address</p>
              <input
                type="email"
                placeholder=""
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div class="field">
              <p>Password</p>
              <input
                type="password"
                placeholder=""
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div class="right-register-form">
            <div class="field">
              <p>Last Name</p>
              <input
                type="text"
                placeholder=""
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <div class="gender-field">
              <div class="gender">
                <p>Gender</p>
                <Select
                  name="gender"
                  id="gerder"
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <option value="M">M</option>
                  <option value="F">F</option>
                </Select>
              </div>
              <div calss="birthdate">
                <p>Birth Date</p>
                <div class="birthDateSelect">
                  <input
                    type="date"
                    placeholder=""
                    value={birthDate}
                    onChange={handleBirthDateChange}
                  />
                </div>
              </div>
            </div>
            <div class="field">
              <p>Confirm Password</p>
              <input
                type="password"
                placeholder=""
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </div>
        </div>
        <div class="Empty" style={{ flex: 1 }} />
        <div className="register-last">
          <div className="agree_term">
            <input
              type="checkbox"
              id="agree_term"
              name="agree_term"
              value="agree_term"
              onChange={handleAgreeTerm}
            />
          </div>
          <div class="term">
            <p>
              Yes, I understand and agree to MeetMitr’s{" "}
              <span>Terms of Service.</span>
              Including the <span>User Agreement</span>
              and<span> Privacy Policy.</span>
            </p>
          </div>
          <div class="button">
            <form action={submitRegister}>
              <Button type="Button" onClick={submitRegister}>
                Create Account
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
