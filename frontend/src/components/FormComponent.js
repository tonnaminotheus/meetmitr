import { useNavigate } from "react-router-dom";
import "./FormComponent.css";

import globalApi from "../globalApi";
import globalVar from "../cookie";

var axios = require("axios").default;
var hash = require("object-hash");

const FormComponent = (props) => {
  let navigate = useNavigate();
  const toFeed = () => {
    navigate("/feed");
  };
  function togglePassword() {
    let pass_box = document.getElementById("password-input-box");
    console.log("click checkbox");
    if (pass_box.type === "text") {
      pass_box.type = "password";
    } else if (pass_box.type === "password") {
      pass_box.type = "text";
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
          globalVar.accessToken = response.data["accessToken"];
          globalVar.refreshToken = response.data["refreshToken"];
          globalVar.UserID = response.data["UserID"];

          //redirect
          toFeed();
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
      <h2>Hi Mitr!</h2>
      <form>
        <div className="form-control">
          <input
            type="email"
            placeholder="Email Address"
            id="email-input-box"
            className="input-box"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
        </div>
        <div className="form-control">
          <input
            type="password"
            placeholder="Password"
            className="input-box"
            id="password-input-box"
            name="password"
            minLength={0}
            required
          />
        </div>
        <div className="form-control">
          <input type="checkbox" onClick={togglePassword} />
          Show Password
        </div>

        <button id="login-btn" className="btn" onClick={requestLogin}>
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
            className="btn"
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
;

export default FormComponent;
