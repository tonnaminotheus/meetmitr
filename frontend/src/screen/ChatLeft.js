import naem from "./../asset/naemblack.jpg";
import styles from "./ChatLeft.css";
const ChatLeft = (props) => {
  return (
    <div style={container}>
      <img src={naem} className="profile" style={picture} />
      <h1 style={text}>NAEM BURAKU</h1>
      <button className="button" style={button}>
        See Profile
      </button>
      <button className="button" style={button}>
        Back to Chat List
      </button>
    </div>
  );
};

export default ChatLeft;

const container = {
  display: "flex",
  width: "34%",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
  height: "100%",
};

const picture = {
  height: 203,
  width: 203,
  borderRadius: 203,
  marginTop: 48,
  borderColor: "#424242",
  borderWidth: 7,
  borderStyle: "solid",
};

const button = {
  marginTop: 24,
  backgroundColor: "#FFC229",
  color: "#FFFFFF",
  fontFamily: "Roboto",
  height: 44,
  width: 320,
  fontSize: 24,
  alignItems: "center",
  borderWidth: 0,
  borderRadius: 8,
};

const text = {
  marginTop: 24,
  fontFamily: "Roboto",
};
