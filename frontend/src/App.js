import logo from './logo.svg';
import './App.css';

// login page
import LoginPageDesc from "./components/LoginPageDesc"
import LoginComponent from "./components/LoginComponent"

//create event
import CreateEventPicComponent from "./components/CreateEventPicComponent"
import CreateEventFormComponent from "./components/CreateEventFormComponent"
import CreateEventInfoComponent from "./components/CreateEventInfoComponent"

// login page
// function App() {
//   return (
//     <div className="App">
//       <h1>Welcome to Meetmitr</h1>
//       <div className="login-container">
//         <LoginPageDesc/>
//         <LoginComponent/>
//       </div>
//     </div>
//   );
// }

//create event form 
function App() {
  return (
    <div className="App">
      <h1>Create Event Page</h1>
      <div className="create-event-container">
        <CreateEventPicComponent />
        <CreateEventInfoComponent/>
      </div>
    </div>
  );
}


export default App;
