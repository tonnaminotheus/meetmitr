import "./Chat.css";
import styles from "./Chat.css";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";
import { useLocation, useNavigate } from "react-router-dom";
import naem from "../../src/asset/naemblack.jpg";
const Chat = (props) => {
  const { state } = useLocation();
  //console.log("state : ", state);
  //const state = { imgUrl: "", profileName: "naem", dmId: 2, userId: 3 };
  return (
    <div className="flexbox-container">
      <ChatLeft imgUrl={state.imgUrl} name={state.profileName} />
      <ChatRight dmId={state.dmId} userId={state.userId} />
    </div>
  );
};

export default Chat;
