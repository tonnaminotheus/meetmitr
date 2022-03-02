import React, { useEffect, useState } from "react";
import globalVar from "../cookie";
import globalApi from "../globalApi";
let currentUserId = globalVar.userID;

const textChat = {
  maxWidth: 500,
  fontFamily: "Roboto",
  fontSize: 36,
  color: "black",
  backgroundColor: "#CAEDE9",
  borderStyle: "solid",
  borderColor: "#000000",
  borderWidth: 1,
  margin: 16,
};

const chatItem = (props) => {
  if (props.isUser) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <text style={{ fontFamily: "Roboto", fontSize: 36, color: "black" }}>
          {props.time}
        </text>
        <text style={textChat}>{props.message}</text>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <text
        style={{
          maxWidth: 500,
          fontFamily: "Roboto",
          fontSize: 36,
          color: "black",
          backgroundColor: "#CAEDE9",
          borderStyle: "solid",
          borderColor: "#000000",
          borderWidth: 1,
          margin: 16,
        }}
      >
        {props.message}
      </text>
      <text style={{ fontFamily: "Roboto", fontSize: 36, color: "black" }}>
        {props.time}
      </text>
    </div>
  );
};

const ChatRight = (props) => {
  const [chatArray, setChatArray] = useState([]);
  const [text, setText] = useState("");

  const change = (newText) => {
    setText(newText);
    console.log(newText);
  };

  useEffect(() => {
    console.log(text);
  });

  return (
    <div style={container}>
      <div style={divScroller}>
        <chatItem time={"04:20"} message={"TEST"} isUser={true}></chatItem>
      </div>
      <div
        style={{
          width: "100%",

          height: "7%",
          alignItem: "center",
          alignSelf: "center",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#FAF3E7",
        }}
      >
        <input
          type="text"
          style={{
            marginLeft: 16,
            width: "82%",
            alignSelf: "center",
            height: 35,
            backgroundColor: "#CAEDE9",
          }}
          onChange={change}
        ></input>
        <button style={sendButton}>send</button>
      </div>
    </div>
  );
};

export default ChatRight;

const divScroller = {
  overflowY: "scroll",
  width: "100%",
  height: "93%",
  backgroundColor: "#FAF3E7",
  display: "flex",
  flexDirection: "column",
};

const container = {
  width: "66%",
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const textinput = { backgroundColor: "#000000", height: "10%" };

const sendButton = {
  marginLeft: 32,
  width: 100,
  height: 35,
  alignSelf: "center",
  fontFamily: "Roboto",
  fontSize: 16,
  fontWeight: "bold",
  backgroundColor: "#8DACEC",
  borderRadius: 8,
  borderWidth: 0.2,
};
