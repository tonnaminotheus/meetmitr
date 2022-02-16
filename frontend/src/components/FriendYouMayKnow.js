import naem from "./../asset/naemblack.jpg";
const FriendYouMayKnow = (props) => {
  return (
    <div style={container}>
      <div
        style={{
          alignItems: "center",
          alignSelf: "center",
          display: "flex",
          flexDirection: "column",
          height: 72,
          backgroundColor: "black",
          borderRadius: 8,
        }}
      >
        <p
          style={{
            alignItem: "center",
            display: "flex",
            marginTop: 12,
            color: "white",
            paddingTop: 8,
            fontFamily: "Roboto",
            fontSize: 24,
          }}
        >
          Friends You May Know
        </p>
      </div>

      <div style={smolContainer}>
        <div style={friend}>
          <div style={friendProfile}>
            <img src={naem} style={picture}></img>
            <div style={{ marginLeft: 24 }}>
              <p style={profileText}>Phet Putt</p>
              <p>69 mutual friends</p>
            </div>
          </div>
          <div>
            <button style={button}>Add Friend</button>
            <button style={button}>See Profile</button>
          </div>
        </div>
        <hr size="2" width="458" color="#000000"></hr>
        <div style={friend}>
          <div style={friendProfile}>
            <img src={naem} style={picture}></img>
            <div style={{ marginLeft: 24 }}>
              <p style={profileText}>Phet Putt</p>
              <p>69 mutual friends</p>
            </div>
          </div>
          <div>
            <button style={button}>Add Friend</button>
            <button style={button}>See Profile</button>
          </div>
        </div>
        <hr size="2" width="458" color="#000000"></hr>
        <div style={friend}>
          <div style={friendProfile}>
            <img src={naem} style={picture}></img>
            <div style={{ marginLeft: 24 }}>
              <p style={profileText}>Phet Putt</p>
              <p>69 mutual friends</p>
            </div>
          </div>
          <div>
            <button style={button}>Add Friend</button>
            <button style={button}>See Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendYouMayKnow;

const container = {
  width: 527,
  height: 772,
  borderColor: "black",
  borderRadius: 16,
  borderStyle: "solid",
  borderWidth: 3,
  backgroundColor: "black",
};

const smolContainer = {
  backgroundColor: "white",
  height: 694,
  width: "100%",
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
};

const friend = {
  display: "flex",
  flexDirection: "column",
  height: 200,
  borderColor: "#000000",
  borderWidth: 1,
  borderStyle: "solid",
};

const friendProfile = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginTop: 16,
  marginLeft: 24,
};

const picture = {
  height: 80,
  width: 80,
  borderRadius: 80,
  borderWidth: 3,
  borderStyle: "solid",
  marginLeft: 24,
};

const profileText = {
  fontFamily: "Roboto",
  fontSize: 36,
  marginTop: 16,
  marginBottom: 16,
  lineHeight: 0,
};

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

const mutualFriend = {
  fontFamily: "Roboto",
  fontSize: 16,
};
