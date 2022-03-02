import yellowlogo from "../asset/iconyellow.png";
import { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import globalApi from "../globalApi";
import bg from "../asset/MeetmitrBgNoHead.png";

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
  height: 60px;
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
const TextInput = styled.input`
  height: 60px;
  width: 90%;
  border: 2px solid #c4c4c4;
  border-radius: 10px;
  background-color: #ffffff;
  font-size: 30px;
  font-weight: bold;
  font-family: "Titillium Web";
  padding-left: 10px;
`;
const InputHeader = styled.p`
  margin-top: 0px;
  line-height: 10px;
  font-size: 24px;
  font-weight: medium;
  font-family: "Roboto", sans-serif;
`;
function Register() {
  let navigate = useNavigate();
  var hash = require("object-hash");
  const [agreeTerm, setAgreeTerm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNamePlaceHolder, setFirstNamePlaceHolder] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNamePlaceHolder, setLastNamePlaceHolder] = useState("");
  const [email, setEmail] = useState("");
  const [emailPlaceHolder, setEmailPlaceHolder] = useState("");
  const [gender, setGender] = useState("M");
  const [birthDate, setBirthDate] = useState(moment().format("yyyy-MM-DD"));
  const [password, setPassword] = useState("");
  const [passwordPlaceHolder, setPasswordPlaceHolder] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordPlaceHolder, setConfirmPasswordPlaceHolder] =
    useState("");
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
    let pass = true;
    if (firstName === "") {
      setFirstNamePlaceHolder("First name can’t be blank");
      setFirstName("");
      pass = false;
    }
    if (lastName === "") {
      setLastNamePlaceHolder("Last name can’t be blank");
      setLastName("");
      pass = false;
    }
    if (email === "") {
      setEmailPlaceHolder("Email can’t be blank");
      setEmail("");
      pass = false;
    }
    if (password.length < 8) {
      setPasswordPlaceHolder(
        "Password too short, at least 8 characters required"
      );
      setPassword("");
      pass = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordPlaceHolder("Password not matched");
      setConfirmPassword("");
      pass = false;
    }
    if (pass) {
      axios({
        method: "POST",
        url: globalApi.register,
        data: {
          email: email,
          gender: gender,
          birthdate: birthDate,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
      })
        .then((respond) => {
          navigate("/verifyEmail", { email: email });
        })
        .catch((error) => {});
    }
  };
  return (
    <div
      className="registerPage"
      style={{
        display: "flex",
        height: "100%",
        minHeight: "100vh",
        justifyContent: "center",
        backgroundImage: `url(${bg})`,
        backgroundColor: `#FFE5B9`,
      }}
    >
      <div
        className="register-container"
        style={{
          borderRadius: "15px",
          backgroundColor: "#ffffff",
          marginTop: "150px",
          marginBotton: "150px",
          marginLeft: "250px",
          marginRight: "250px",
          flex: "1",
        }}
      >
        <div
          className="register-header"
          style={{
            display: "flex",
            marginLeft: "50px",
            marginTop: "10px",
            alignItems: "center",
          }}
        >
          <div className="logo">
            <img
              className="yellowlogo"
              src={yellowlogo}
              alt=""
              style={{
                height: "66px",
                width: "60px",
                flexBasis: "10%",
              }}
            />
          </div>
          <div className="createAccount">
            <p
              style={{
                fontSize: "55px",
                margin: "0px",
                fontWeight: "bold",
                fontFamily: "Roboto, sans-serif",
                lineHeight: "0px",
              }}
            >
              Create Account
            </p>
          </div>
          <div className="Empty" style={{ flex: 1 }} />
          <div className="Login">
            <p
              style={{
                fontSize: "24px",
                margin: "0px",
                fontWeight: "regular",
                fontFamily: "Roboto, sans-serif",
                lineHeight: "0px",
                color: "#303B5B",
                paddingRight: "20px",
              }}
            >
              Back to Log in?
            </p>
          </div>
        </div>
        <div
          className="register-body"
          style={{
            display: "flex",
            marginLeft: "50px",
            flexDirection: "row",
          }}
        >
          <div
            className="left-register-form"
            style={{
              flex: "1",
              flexDirection: "column",
            }}
          >
            <div
              className="field"
              style={{
                flex: "1",
                marginTop: "10px",
                whiteSpace: "nowrap",
                color: "#303b5b",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <div>
                <InputHeader>First Name</InputHeader>
              </div>
              <TextInput
                type="text"
                placeholder={firstNamePlaceHolder}
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div
              className="field"
              style={{
                flex: "1",
                marginTop: "10px",
                whiteSpace: "nowrap",
                color: "#303b5b",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <div>
                <InputHeader>Email Address</InputHeader>
              </div>
              <TextInput
                type="email"
                placeholder={emailPlaceHolder}
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div
              className="field"
              style={{
                flex: "1",
                marginTop: "10px",
                whiteSpace: "nowrap",
                color: "#303b5b",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <div>
                <InputHeader>Password</InputHeader>
              </div>
              <TextInput
                type="password"
                placeholder={passwordPlaceHolder}
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div
            className="right-register-form"
            style={{
              flex: "1",
              flexDirection: "column",
            }}
          >
            <div
              className="field"
              style={{
                flex: "1",
                marginTop: "10px",
                whiteSpace: "nowrap",
                color: "#303b5b",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <div>
                <InputHeader>Last Name</InputHeader>
              </div>
              <TextInput
                type="text"
                placeholder={lastNamePlaceHolder}
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <div
              className="gender-field"
              style={{
                display: "flex",
                flex: "1",
                marginTop: "10px",
                whiteSpace: "nowrap",
                lineHeight: "10px",
                fontSize: "24px",
                fontWeight: "medium",
                fontFamily: `"Roboto", sans-serif`,
                color: "#303b5b",
                flexDirection: "row",
              }}
            >
              <div
                className="gender"
                style={{
                  marginTop: "10px",
                  whiteSpace: "nowrap",
                  color: "#303b5b",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <InputHeader>Gender</InputHeader>
                </div>
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
              <div
                calss="birthdate"
                style={{
                  marginTop: "10px",
                  whiteSpace: "nowrap",
                  color: "#303b5b",
                  flexDirection: "column",
                  textAlign: "left",
                  display: "flex",
                  flex: "1",
                  marginRight: "70px",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <InputHeader>Birth Date</InputHeader>
                </div>
                <div className="birthDateSelect">
                  <input
                    type="date"
                    placeholder=""
                    value={birthDate}
                    onChange={handleBirthDateChange}
                    style={{
                      height: "60px",
                      width: "100%",
                      border: "2px solid #c4c4c4",
                      borderRadius: "10px",
                      backgroundColor: "#ffffff",
                      fontSize: "30px",
                      fontWeight: "bold",
                      fontFamily: "Titillium Web",
                      paddingLeft: "10px",
                      lineHeight: "30px",
                      margin: "0px",
                      color: " #000000",
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className="field"
              style={{
                flex: "1",
                marginTop: "10px",
                whiteSpace: "nowrap",
                color: "#303b5b",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <div>
                <InputHeader>Confirm Password</InputHeader>
              </div>
              <TextInput
                type="password"
                placeholder={confirmPasswordPlaceHolder}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </div>
        </div>
        <div className="Empty" style={{ flex: 1 }} />
        <div
          className="register-last"
          style={{
            display: "flex",
            marginTop: "75px",
            marginLeft: "75px",
            flexDirection: "row",
            alignSelf: "flex-end",
            alignItems: "center",
          }}
        >
          <div className="agree_term">
            <input
              type="checkbox"
              id="agree_term"
              name="agree_term"
              value="agree_term"
              onChange={handleAgreeTerm}
            />
          </div>
          <div className="term">
            <p
              style={{
                flex: 1,
                margin: "0px",
                lineHeight: "24px",
                fontSize: "24px",
                fontWeight: "medium",
                fontFamily: `"Roboto", sans-serif`,
                color: "#8b8b8b",
                textAlign: "left",
              }}
            >
              Yes, I understand and agree to MeetMitr’s{" "}
              <span
                style={{
                  color: "#303b5b",
                }}
              >
                Terms of Service.
              </span>
              Including the{" "}
              <span
                style={{
                  color: "#303b5b",
                }}
              >
                User Agreement
              </span>
              and
              <span
                style={{
                  color: "#303b5b",
                }}
              >
                {" "}
                Privacy Policy.
              </span>
            </p>
          </div>
          <div className="button">
            <Button type="Button" onClick={submitRegister}>
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
