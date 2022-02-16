import logo from "./logo.svg";
import "./App.css";

// login page
import LoginPageDesc from "./components/LoginPageDesc";
import LoginComponent from "./components/LoginComponent";

// create event
import CreateEventPicComponent from "./components/CreateEventPicComponent";
import CreateEventFormComponent from "./components/CreateEventFormComponent";
import CreateEventInfoComponent from "./components/CreateEventInfoComponent";

import JoinEventFilterModal from "./components/modal/modal.js";
import { useState } from "react";

import Chat from "./screen/Chat";
var hash = require("object-hash");

// login page
// {/* <h1>Welcome to Meetmitr</h1> */}
// <div className="login-container">
//<LoginPageDesc />
// <LoginComponent />
//</div>
function App() {
  return (
    <div className="App">
      <Chat></Chat>
    </div>
  );
}
export default App;
