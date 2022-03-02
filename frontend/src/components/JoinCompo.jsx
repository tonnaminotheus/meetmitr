import React, { useEffect } from "react";
import Cards from "./cards";
import MMheader from "./MMheader";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import JoinEventFilterModal from "./modal";
import "./JoinCompo.css";
import { useState } from "react";
import globalApi from "../globalApi";
import axios from "axios";

//new
import Cookies from "universal-cookie";
import NotificationModal from "./modal/NotificationModal";

import nuke from "../asset/nuclear.png";
import weed from "../asset/weed.jpg";
import dota from "../asset/dota2_social.jpg";
import ayaya from "../asset/ayaya.jpeg";
import weeb from "../asset/weeb.jpg";
import girl from "../asset/girl_night.jpg";
import uno from "../asset/uno.jpg";
import john from "../asset/John.jpg";

function JoinComponent() {
  //test cookie
  const cookies = new Cookies();
  console.log("in feed");
  console.log(cookies.get("cookie"));

  let accessToken = cookies.get("cookie").accessToken;

  //noti modal state
  const [notificationState, setNotificationModalState] = useState(false);

  const [cardInfo, setCardInfo] = useState({});
  const [cardsInfo, setCardsInfo] = useState({});

  const [search, setSearch] = useState("");
  const [modalstate, setModalstate] = useState(false);
  const [joinEventFilterProps, setJoinEventFilterProps] = useState({});

  useEffect(() => {
    let isMounted = true;
    axios
      .get(globalApi.recommendFeed + "1", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        if (isMounted) {
          console.log(res.data);
          setCardInfo(res.data);
          // setCardsInfo((prevState) => {
          //   return {
          //     ...prevState,
          //     cardInfo,
          //   };
          // });
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const updateSearch = (event) => {
    // console.log(event.target.value);
    setSearch(event.target.value);
  };

  const filterOnClick = () => {
    setModalstate(true);
  };

  const setModalClose = () => {
    setModalstate(false);
  };

  //passed function
  const onFilterSubmit = (filter_props) => {
    console.log("get props from child compo");
    setJoinEventFilterProps(filter_props);
  };

  const date = () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    return date;
  };

  console.log(cardInfo["EventList"]);
  console.log(Object.keys(cardInfo).length);

  let filteredEvents =
    Object.keys(cardInfo).length !== 0 &&
    cardInfo["EventList"].filter((event) => {
      console.log(event.name);
      return event.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

  return (
    <div className="backG">
      <MMheader
        name="Event Feed"
        notificationState={notificationState}
        setNotificationModalState={setNotificationModalState}
      />
      <Form.Group className="Searcher" controlId="exampleForm.ControlInput1">
        <Row>
          <Col>
            <Form.Control
              type="text"
              size="lg"
              placeholder="type event name"
              onChange={(event) => updateSearch(event)}
            />
          </Col>
          <Col>
            <button
              className="btn btn-dark btn-lg"
              onClick={filterOnClick}
              modalstate={modalstate}
            >
              filter
            </button>
          </Col>
        </Row>
      </Form.Group>
      <JoinEventFilterModal
        onFilterSubmit={onFilterSubmit}
        mState={modalstate}
        onClose={setModalClose}
      />

      <NotificationModal
        notificationState={notificationState}
        setNotificationModalState={setNotificationModalState}
      />

      {/* <input
          type="text"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        ></input> */}
      <Cards events={filteredEvents} />
    </div>
  );
}

export default JoinComponent;

// test input
// const [cardInfo, setCardInfo] = useState({
//   events: [
//     {
//       id: 9,
//       title: "Nuclear Discuss",
//       date: "Mon 28 February",
//       place: "Pathumwan99, Bangkok",
//       imgSrc: nuke,
//     },
//     {
//       id: 2,
//       title: "Weed party",
//       date: "Wed 9 March",
//       place: "54 ซอย ลาดพร้าว 1 Chom Phon, Chatuchak, Bangkok 10900",
//       imgSrc: weed,
//     },
//     {
//       id: 3,
//       title: "Dota2 Time",
//       date: "Fri 1 April",
//       place: "39 1 Chatuchak, Bangkok 10900",
//       imgSrc: dota,
//     },
//     {
//       id: 4,
//       title: "Ayaya Ayaya",
//       date: "Fri 14 January",
//       place:
//         "126/1 Vibhavadi Rangsit Rd, แขวง รัชดาภิเษก Din Daeng, Bangkok 10400",
//       imgSrc: ayaya,
//     },
//     {
//       id: 5,
//       title: "Weebo party",
//       date: "Mon 28 February",
//       place:
//         "2 Soi Phetchaburi 47 Yaek 10, Bang Kapi, Huai Khwang, Bangkok 10310",
//       imgSrc: weeb,
//     },
//     {
//       id: 6,
//       title: "Girl Night",
//       date: "Sun 30 March",
//       place:
//         "291 Lat Phrao 101 Rd, Khlong Chan, Bang Kapi District, Bangkok 10240",
//       imgSrc: girl,
//     },
//     {
//       id: 7,
//       title: "Uno time",
//       date: "Sun 6 February",
//       place: "3333 Rama IV Rd, Khlong Toei, Bangkok 10110",
//       imgSrc: uno,
//     },
//     {
//       id: 8,
//       title: "John Wick Training",
//       date: "Wed 9 March",
//       place:
//         "944 Rama IV Rd, เเขวง วังใหม่ Pathum Wan District, Bangkok 10330",
//       imgSrc: john,
//     },
//   ],
// });
