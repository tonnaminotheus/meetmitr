import "./Chat.css";
import styles from "./Chat.css";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";
const Chat = (props) => {
  return (
    <div className="flexbox-container">
      <ChatLeft />
      <ChatRight />
    </div>
  );
};

export default Chat;
