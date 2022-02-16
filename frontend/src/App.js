import logo from "./logo.svg";
import "./App.css";

//css
import "./components/css_extensions/btn.css";
import "./components/css_extensions/page_div_config.css";

// login page
import LoginRootComponent from "./components/LoginRootComponent";

// create event
import EditEventComponent from "./components/EditEventComponent";

//modal
import JoinEventFilterModal from "./components/modal/modal.js";

import { useState } from "react";

import JoinComponent from "./components/JoinCompo";

var hash = require("object-hash");

function App() {
  return (
    <div className="App">
      {/* <h1>Welcome to Meetmitr</h1> */}
      <LoginRootComponent />
    </div>
  );
}

// create event form
// function App() {
//   return (
//     <div className="App">
//       <EditEventComponent eventID={"2"}/>
//     </div>
//   );
// }

export default App;
