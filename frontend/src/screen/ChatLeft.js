import naem from "./../asset/naemblack.jpg";
import styles from "./ChatLeft.css";
import { useNavigate } from "react-router-dom";
const ChatLeft = (props) => {
  const navigate = useNavigate();
  //console.log(props.imgUrl);
  return (
    <div style={container}>
      <img
        src={props.imgUrl === "" ? naem : props.imgUrl}
        className="profile"
        style={picture}
      />
      <h1 style={text}>{props.name}</h1>
      <button className="button" style={button}>
        See Profile
      </button>
      <button
        className="button"
        style={button}
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
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
