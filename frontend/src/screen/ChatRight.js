import React, { useEffect, useState } from "react";

import globalApi from "../globalApi";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Cookies from "universal-cookie";

var axios = require("axios").default;
const textChat = {
  maxWidth: 500,
  fontFamily: "Roboto",
  fontSize: 24,
  color: "black",
  backgroundColor: "#CAEDE9",
  borderStyle: "solid",
  borderColor: "#000000",
  borderWidth: 1,
  padding: 16,
  alignSelf: "flex-end",
  alignItem: "flex-start",
  marginLeft: 16,
  marginRight: 16,
  borderRadius: 16,
  borderColor: "#000000",
  borderWidth: 1,
};
const ChatItem = (props) => {
  //console.log("chatItemmmmmm");

  if (props.isUser) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "flex-end",
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <text style={textChat}>{props.message}</text>

        <text style={{ fontFamily: "Roboto", fontSize: 24, color: "black" }}>
          {props.time}
        </text>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: 16,
        alignItems: "flex-end",
      }}
    >
      <text style={textChat}>{props.message}</text>

      <text style={{ fontFamily: "Roboto", fontSize: 24, color: "black" }}>
        {props.time}
      </text>
    </div>
  );
};

const ChatRight = (props) => {
  const cookies = new Cookies();
  //console.log("COOKIES : ", cookies);
  let accessToken = cookies.get("cookie").accessToken;

  let currentUserId = cookies.get("cookie").userID;
  //const [messageHistory, setMessageHistory] = useState([]);

  //const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [chatArray, setChatArray] = useState([]);
  const [socketArray, setSocketArray] = useState([]);
  const [text, setText] = useState("");
  const [socketUrl, setSocketUrl] = useState("");
  const change = (newText) => {
    setText(newText);
    //console.log(newText);
  };

  useEffect(() => {
    console.log(text);
  }, [socketArray, text, setText, setSocketArray]);
  useEffect(() => {
    console.log("TOKEN LINK", globalApi.chatToken + `dm/${props.userId}`);
    axios({
      method: "get",
      url: globalApi.chatToken + `dm/${props.userId}`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setSocketUrl(globalApi.chatSocket + response.data.token);
        console.log("URL", globalApi.chatSocket + response.data.token);
        requestChatHistory();
        //redirect
      })
      .catch(function (error) {
        console.log("error at chatToken");
        console.log(error.response);
      })
      .then(function () {
        // always executed
      });
  }, []);

  //console.log(socketUrl);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  useEffect(() => {
    if (lastMessage !== null) {
      //console.log(lastMessage.data);
      setSocketArray((prev) => prev.concat(lastMessage.data));
    }
  }, [lastMessage, setSocketArray]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const handleClickSendMessage = () => {
    //sendMessage("text");
    console.log("TEXT SENDING : ", text);
    sendMessage(text);
  };

  function requestChatHistory() {
    //****might error if some fields is missing

    axios({
      method: "get",
      url: globalApi.chatHistory + `${props.dmId}`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then(function (response) {
        console.log(response.data.chatHistory);
        var newArray = [];
        for (var i = response.data.chatHistory.length - 1; i >= 0; i--) {
          newArray.push(response.data.chatHistory[i]);
        }

        setChatArray(newArray);

        //redirect
      })
      .catch(function (error) {
        console.log("error at chatHistory");
        console.log(error.response);
      })
      .then(function () {
        // always executed
      });
  }
  //requestChatHistory();

  const renderChat = chatArray.map((chatArray) => {
    //console.log("userid", currentUserId, "senderID", typeof chatArray.senderId);
    //console.log(currentUserId === chatArray.senderId);
    return (
      <ChatItem
        message={chatArray.message}
        time={chatArray.dateTime}
        isUser={chatArray.senderId === currentUserId}
      ></ChatItem>
    );
  });
  const renderSocket = socketArray.map((socketArray) => {
    let socketArray2 = JSON.parse(socketArray);
    console.log(socketArray2.message);
    console.log(socketArray2.senderId);
    console.log(socketArray2.dateTime);
    //console.log("userid", currentUserId, "senderID", socketArray.senderId);
    console.log(currentUserId === socketArray2.senderId);
    return (
      <ChatItem
        message={socketArray2.message}
        time={socketArray2.dateTime}
        isUser={socketArray2.senderId === currentUserId}
      ></ChatItem>
    );
  });
  return (
    <div style={container}>
      <div style={divScroller}>
        {" "}
        {renderChat}
        {renderSocket}
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
          onChange={(event) => setText(event.target.value)}
        ></input>
        <button style={sendButton} onClick={handleClickSendMessage}>
          send
        </button>
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
