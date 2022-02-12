import logo from './logo.svg';
import './App.css';


// login page
import LoginPageDesc from "./components/LoginPageDesc"
import LoginComponent from "./components/LoginComponent"

// create event
import CreateEventPicComponent from "./components/CreateEventPicComponent"
import CreateEventFormComponent from "./components/CreateEventFormComponent"
import CreateEventInfoComponent from "./components/CreateEventInfoComponent"

import JoinEventFilterModal from "./components/modal/modal.js"
import { useState } from 'react';

var hash = require('object-hash');

// login page
function App() {
  return (
    <div className="App">
      {/* <h1>Welcome to Meetmitr</h1> */}
      <div className="login-container">
        <LoginPageDesc/>
        <LoginComponent/>
      </div>
    </div>
  );
}

//create event form 
// function App() {
//   return (
//     <div className="App">
//       <h1>Create Event Page</h1>
//       <div className="create-event-container">
//         <CreateEventPicComponent />
//         <CreateEventInfoComponent/>
//       </div>
//     </div>
//   );
// }

//modal
// function App() {
//     const date=()=>{
//       var today = new Date();
//       var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//       return date
//     }

//     //data to get from form
//     const [joinEventFilterProps, setJoinEventFilterProps] = useState({})

//     //passed function
//     const onFilterSubmit=(filter_props)=>{
//       console.log("get props from child compo")
//       setJoinEventFilterProps(filter_props)
//     }

//     return (
//       <div className="App">
//         <h1>Create Event Page</h1>
//         <div className="modal-filter-container">
//           <JoinEventFilterModal onFilterSubmit={onFilterSubmit}/>
//         </div>
//       </div>
//     );
//   }

export default App;
