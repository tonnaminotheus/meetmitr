// import "./FormComponent.css";
import "../components/css_extensions/form_control.css";

import "./FormComponent.css"

import globalApi from "../globalApi";

import Cookies from "universal-cookie";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

var axios = require("axios").default;
var hash = require("object-hash");

const FormComponent = (props) => {


  // ip ------------------------------------------------------
  useEffect(()=>{
    axios({
        method: 'get',
        url: `https://checkip.amazonaws.com/`,
        timeout: 8000
    })
    .then((res)=>{
      console.log(res)
      let ip = res.data.trim()
      let new_cookie_value = cookies.get("cookie");
      new_cookie_value["ip"] = ip
      cookies.set(
        "cookie",
        new_cookie_value,
        { path: "/" }
      )
      console.log(cookies.get("cookie"))
    })
    .catch(error => {
        console.log("error!!")
        console.log(error)
    })
  },[]);
  // ------------------------------------------------------------

  //cookies -----------------------------------------------------
  const cookies = new Cookies();
  cookies.remove("cookie");
  cookies.set(
    "cookie",
    { userID: "", accessToken: "", refreshToken: ""},
    { path: "/" }
  );
  // ------------------------------------------------------------

  const [pwdType, setpwdType] = useState("password");

  // navigate ---------------------------------------------------
  let navigate = useNavigate();
  const toFeed = () => {
    navigate("/feed");
  };
  // -----------------------------------------------------------

  // authen ip modal -------------------------------------------
  
  const setAuthenModalOpen = props.setAuthenModalOpen;

  // -----------------------------------------------------------

  const getCheckboxStatus = () => {
    return pwdType === "text";
    // document.getElementById("pwd-checkbox").checked
  };

  function togglePassword(event) {
    console.log(event.target.checked);
    if (pwdType === "text") {
      setpwdType("password");
    } else if (pwdType === "password") {
      setpwdType("text");
    }
  }

  const requestLogin = (event) => {
    event.preventDefault();
    console.log(hash(document.getElementById("password-input-box").value))
    const data = {
      email: document.getElementById("email-input-box").value,
      // password: hash(document.getElementById("password-input-box").value),
      password: hash(document.getElementById("password-input-box").value),
      ip: cookies.get("cookie")["ip"]
    };

    axios({
      method: "post",
      url: globalApi.login,
      data: data,
    })
      .then(function (response) {
        console.log(response);

        if (response.status == 200) {
          //set(name, value, [options])
          cookies.set(
            "cookie",
            {
              userID: parseInt(response.data["userId"]),
              accessToken: response.data["accessToken"],
              refreshToken: response.data["refreshToken"],
            },
            { path: "/" }
          );
          // cookies.set("cookie", response.data["userId"], {path:"/"})
          console.log(cookies);
          console.log(cookies.get("cookie"));
          //redirect
          toFeed();
        }
        else if (response.status == 202) {
          console.log(response)
          //verify email
          // preventDefault();
          props.setAuthenModalOpen(true)
        }
      })
      .catch(function (error) {
        console.log("error!!");
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  return (
    <div className="login-form">
      <h2 className="login-title">Hi Mitr!</h2>
      <form>
        <div className="Form-control">
          <input
            type="email"
            placeholder="Email Address"
            id="email-input-box"
            className="input-box"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            onChange={(event)=>{props.setUserEmail(event.target.value)}}
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
          <input
            type="checkbox"
            id="pwd-checkbox"
            onClick={togglePassword}
            onChange={(event)=>{console.log(event.target.checked)}}
            checked={getCheckboxStatus()}
          />
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
