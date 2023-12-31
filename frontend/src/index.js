import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Register from "./screens/Register";
import VerifyEmail from "./screens/VerifyEmail";
import FinishRegister from "./screens/FinishRegister";
import JoinEvent from "./screens/JoinEventDetail";
import JoinComponent from "./components/JoinCompo";
import Chat from "./screen/Chat";
import EditEventComponent from "./components/EditEventComponent";
import LoginRootComponent from "./components/LoginRootComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatList from "./screen/ChatList";
import RateQuiz from "./components/PersonalityQuizRateForm.js";
import PersonalQuiz from "./screens/PersonalQuiz";
import EditProfile from "./screens/EditProfile";
import Profile from "./screen/Profile";
import VerifyRequest from "./components/VerifyRequest"

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginRootComponent />} />
      <Route path="register" element={<Register />} />
      <Route path="verifyEmail" element={<VerifyEmail />} />
      <Route path="activate/:activateStr" element={<FinishRegister />} />
      <Route path="joinEvent" element={<JoinEvent />} />
      <Route path="feed" element={<JoinComponent />} />
      <Route path="chat" element={<Chat />} />
      <Route path="createEvent" element={<EditEventComponent />} />
      <Route path="editEvent" element={<EditEventComponent />} />
      <Route path="chatList" element={<ChatList />} />
      <Route path="quiz" element={<PersonalQuiz />} />
      <Route path="quiz2" element={<RateQuiz />} />
      <Route path="editProfile" element={<EditProfile />} />
      <Route path="profile" element={<Profile />} />
      
      
      
      <Route path="v" element={<VerifyRequest />} /> 
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
