import MMheader from "../components/MMheader";
import ChatListUser from "../components/ChatListUser";
import FriendYouMayKnow from "../components/FriendYouMayKnow";

const ChatList = (props) => {
  return (
    <div style={{ marginBottom: 48 }}>
      <MMheader name="Chat List" />
      <div
        style={{
          marginTop: 16,
          marginBottom: 16,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ marginLeft: 60, marginRight: 120 }}>
          <div style={{ overflowY: "scroll", height: "90%", width: "60vw" }}>
            <ChatListUser />
            <ChatListUser />
            <ChatListUser />
          </div>
          <button style={button}>Back</button>
        </div>

        <FriendYouMayKnow />
      </div>
    </div>
  );
};
export default ChatList;
const button = {
  marginLeft: 24,
  color: "white",
  backgroundColor: "#FFC229",
  fontFamily: "Roboto",
  fontSize: 16,
  height: 35,
  width: 148,
  borderWidth: 0,
  borderRadius: 8,
  marginTop: 24,
  marginBottom: 16,
};
