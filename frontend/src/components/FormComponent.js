import "./FormComponent.css";

import globalApi from "../globalApi";
import globalVar from "../cookie";

import Cookies from 'universal-cookie';

import { useNavigate } from "react-router-dom";
import { useState } from "react";

var axios = require("axios").default;
var hash = require("object-hash");

const FormComponent = (props) => {

  //cookies
  const cookies = new Cookies();
  cookies.set("cookie", {"userID" : "", "accessToken" : "", "refreshToken": ""}, {path:"/"})

  const [pwdType,setpwdType] = useState("password")

  let navigate = useNavigate();
  const toFeed = () => {
    navigate("/feed");
  };
  const getCheckboxStatus=()=>{
    return pwdType === "text"
    // document.getElementById("pwd-checkbox").checked
  }
  function togglePassword(event) {
    console.log(event.target.checked)
    if (pwdType === "text") {
      setpwdType("password")
    } else if (pwdType === "password") {
      setpwdType("text");
    }
  }
  const requestLogin = (event) => {
    event.preventDefault();

    const data = {
      email: document.getElementById("email-input-box").value,
      // "password": hash(document.getElementById("password-input-box").value)
      password: document.getElementById("password-input-box").value,
    };

    axios({
      method: "post",
      url: globalApi.login,
      data: data,
    })
      .then(function (response) {
        console.log(response);

            if (response.status == 200) {
                globalVar.accessToken = response.data["accessToken"]
                globalVar.refreshToken = response.data["refreshToken"]
                globalVar.userID = response.data["userId"]

                //set(name, value, [options])
                cookies.set("cookie", {"userID" : response.data["userId"], "accessToken" : response.data["accessToken"], "refreshToken": response.data["refreshToken"]}, {path:"/"})
                // cookies.set("cookie", response.data["userId"], {path:"/"})
                console.log(cookies)
                console.log(cookies.get("cookie"))
                //redirect
                toFeed()
            }
        })
        .catch(function (error) {
            console.log("error!!")
            console.log(error);
        })
        .then(function () {
            // always executed
        });
  }
  return (
    <div className="login-form">
      <h2>Hi Mitr!</h2>
      <form>
        <div className="Form-control">
          <input
            type="email"
            placeholder="Email Address"
            id="email-input-box"
            className="input-box"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
        </div>
        <div className="Form-control">
          <input
            type={pwdType}
            placeholder="Password"
            className="input-box"
            id="password-input-box"
            name="password"
            minLength={0}
            required
          />
        </div>
        <div className="Form-control">
          <input type="checkbox" id="pwd-checkbox" onClick={togglePassword} checked={getCheckboxStatus()}/>
          Show Password
        </div>

        <button id="login-btn" className="custom-button" onClick={requestLogin}>
          <span>Login </span>
        </button>
      </form>

      <div className="bottom-box">
        <form action="https://www.google.com">
          <a href="https://www.google.com/" id="forget-passowrd-link">
            Forgot Password?
          </a>
          <button
            type="submit"
            className="custom-button"
            id="create-acc-btn"
            onClick={() => {
              navigate("/register");
            }}
          >
            <span>Create New Account</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
