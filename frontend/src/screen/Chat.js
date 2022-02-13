import "./Chat.css";
import styles from "./Chat.css";
import ChatLeft from "./ChatLeft";
const Chat = (props) => {
  return (
    <div className="flexbox-container">
      <ChatLeft />
      <h2>Right Side</h2>
    </div>
  );
};

export default Chat;
