import React, { Component, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "./card.css";
import { useState } from "react";
import globalApi from "../globalApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";

const EventCard = (props) => {
  const navigate = useNavigate();
  const [eventInfo, setEventInfo] = useState(props.events);
  // const [tagAvailable, setTagAvailable] = useState({});
  const [display, setDisplay] = useState([true, false, true]);

  // useEffect(() => {
  //   let isMounted = true;
  //   axios.get(globalApi.eventDescription + id).then((res) => {
  //     if (isMounted) {
  //       console.log(res.data);
  //       setEventInfo(res.data);
  //       TagList();
  //     }
  //   });
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  const cookies = new Cookies();
  let user_cookie = cookies.get("cookie");
  let accessToken = user_cookie["accessToken"];

  function TagList() {
    console.log(eventInfo.tags.length);
    const tags = eventInfo.tags;
    const ta = eventInfo.length !== 0;
    const listTags = ta && tags.map((tag) => <li key={"tag-" + tag}>{tag}</li>);
    return <ul>{listTags}</ul>;
  }

  const handleMouseIn = () => {
    console.log("mouse in");
    // if (display[2]) {
    setDisplay([false, true, false]);
    //   const timer = setTimeout(() => {
    //     setDisplay([true, false, true]);
    //   }, 3500);
    //   return () => clearTimeout(timer);
    // }
  };

  const handleMouseOut = () => {
    console.log("mouse out");
    setDisplay([true, false, true]);
  };

  return (
    <div>
      <Card
        className="cardTemplate"
        onClick={() => {
          console.log("clicked");
          navigate("/joinEvent", { state: { eventId: eventInfo.eventId } });
        }}
      >
        <div
          onMouseEnter={handleMouseIn}
          onMouseLeave={handleMouseOut}
          // onMouseOut={handleMouseOut}
          className="cardImg"
        >
          {display[0] && (
            <Card.Img
              className="cardImg"
              variant="top"
              src={eventInfo.images[0]}
              alt=""
            />
          )}
          {display[1] && (
            <div className="cardCate">
              <h2>Category</h2>
              <ul className="cardCateLi">{TagList()}</ul>
            </div>
          )}
        </div>

        <span className="cardTitleBg">{eventInfo.name}</span>
        <Card.Body>
          <Card.Text className="eventDate">{eventInfo.startTime}</Card.Text>
          <Card.Text className="eventPlace">{eventInfo.province}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventCard;

// handleTag = (res) => {
//   console.log(this.state.eventInfo.tags);
//   if (this.state.eventInfo.tags) {
//     this.state.eventInfo.tags.maps((tag) => {
//       console.log(tag);
//     });
//   } else {
//     console.log("tag null");
//   }
// };

// handleMouseOut = () => {
//   console.log("mouse out");
//   this.setState({ busy: 1 });
//   if (this.state.busy === 0)
//     setTimeout(() => {
//       this.setState({
//         style1: { display: "initial" },
//         style2: { display: "none" },
//       });
//     }, 10);
// };

// useEffect(() => {
//   axios({
//     method: "GET",
//     url: globalApi.eventDescription + eventId,
//   })
//     .then((respond) => {
//       const attenNum = respond.data.participants.length;
//       const percent =
//         String((attenNum / respond.data.maxParticipant) * 100) + "%";

//       setEventData(respond.data);
//       setAttendance(attenNum);
//       setProgressData(percent);

//       const hostId = respond.data.creatorId;
//       axios({
//         method: "GET",
//         url: globalApi.userData + hostId,
//       })
//         .then((respond) => {
//           setHostData(respond.data);
//         })
//         .catch((error) => {});
//     })
//     .catch((error) => {});
// }, []);
