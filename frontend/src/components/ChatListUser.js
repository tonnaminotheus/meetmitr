import naem from "./../asset/naemblack.jpg";
import { useNavigate } from "react-router-dom";
const ChatListUser = (props) => {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <img
        src={props.imgUrl === "" ? naem : props.imgUrl}
        style={picture}
      ></img>
      <div style={profile}>
        <p style={usernameText}>{props.name}</p>
        <p style={descriptionText}>{props.lastMessage}</p>
      </div>
      <button
        style={button}
        onClick={() => {
          navigate("/chat", {
            state: {
              userId: props.userId,
              dmId: props.dmId,
              profileName: props.name,
              imgUrl: props.imgUrl,
            },
          });
        }}
      >
        Message
      </button>
      <button
        style={button}
        onClick={() => {
          navigate("/profile", { state: { userId: props.userId } });
        }}
      >
        See Profile
      </button>
    </div>
  );
};

export default ChatListUser;

const container = {
  display: "flex",
  flexDirection: "row",
  height: 120,
  backgroundColor: "#FFFFFF",
  width: 1080,
  borderColor: "black",
  borderRadius: 16,
  borderWidth: 1,
  borderStyle: "solid",
  alignItems: "center",
  marginTop: 32,
  marginBottom: 32,
};

const picture = {
  height: 84,
  width: 84,
  borderRadius: 96,
  marginLeft: 32,
  borderWidth: 2,
  borderRadius: 84,
  borderColor: "#424242",
  borderStyle: "solid",
};

const profile = {
  display: "flex",
  flexDirection: "column",
  width: 600,
  lineHeight: 0,
  marginLeft: 24,
};

const usernameText = {
  fontFamily: "Roboto",
  fontSize: 36,
  marginTop: 16,
};
const descriptionText = {
  fontFamily: "Roboto",
  fontSize: 18,
  marginTop: 20,
};

const button = {
  fontFamily: "Roboto",
  fontSize: 18,
  color: "white",
  backgroundColor: "#FFC229",
  height: 40,
  marginLeft: 24,
  width: 120,
  borderWidth: 0,
  borderRadius: 8,
};
