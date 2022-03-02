import MMheader from "../components/MMheader";
import ChatListUser from "../components/ChatListUser";
import FriendYouMayKnow from "../components/FriendYouMayKnow";
import globalApi from "../globalApi";
import globalVar from "../cookie";
import { useState } from "react";
var axios = require("axios").default;
const ChatList = (props) => {
  let accessToken = globalVar.accessToken;
  const [partners, setPartners] = useState([]);
  function requestFriendList() {
    //****might error if some fields is missing

    axios({
      method: "get",
      url: globalApi.chatPartner,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then(function (response) {
        //console.log(response.data.partners);
        setPartners(response.data.partners);
        //redirect
      })
      .catch(function (error) {
        console.log("error!!");
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
  requestFriendList();

  const friendList = partners.map((partners) => {
    return (
      <ChatListUser
        name={partners.profileName}
        imgUrl={partners.profilePicUrl}
        lastMessage={partners.lastMessage}
        dmId={partners.DMId}
        userId={partners.userId}
      ></ChatListUser>
    );
  });
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
            {friendList}
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
