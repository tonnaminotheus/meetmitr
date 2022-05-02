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
import Dropdown from "./modal/Dropdown";

//new
import Cookies from "universal-cookie";
import NotificationModal from "./modal/NotificationModal";
import InfiniteScroll from "react-infinite-scroll-component";

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
  var cookies = new Cookies();
  var userData = cookies.get("cookie");
  console.log(cookies.get("cookie"));

  let accessToken = cookies.accessToken;
  const [numPage, setNumPage] = useState(1);

  const [notificationState, setNotificationModalState] = useState(false);

  const [cardInfo, setCardInfo] = useState([]);

  const [search, setSearch] = useState("");
  const [modalstate, setModalstate] = useState(false);
  const [submitted, setSubmitted] = useState(0);
  const [time, setTime] = useState({});
  const [usingFilter, setUsingFilter] = useState(false);
  const [disable, setDisable] = useState(false);
  const [lockButtStyle, setLockButtStyle] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [dropdownState, setDropdownState] = useState(false)

  useEffect(() => {
    let isMounted = true;
    axios
      .get(globalApi.recommendFeed + String(numPage), {
        headers: {
          Authorization: "Bearer " + userData.accessToken,
        },
      })
      .then((res) => {
        if (isMounted) {
          console.log(res.data["EventList"]);
          setCardInfo([...cardInfo, ...res.data["EventList"]]);
          console.log([...cardInfo, ...res.data["EventList"]]);
          if (res.data["EventList"].length == 0) {
            setDisable(true);
            setLockButtStyle("#535353");
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response);
      });
    return () => {
      isMounted = false;
    };
  }, [numPage]);

  useEffect(() => {
    console.log("run useEffect");
    console.log(submitted);
    if (Object.keys(time).length > 0)
      axios({
        method: "post",
        url: globalApi.getFilteredEvent + "1",
        headers: {
          authorization: "Bearer " + userData.accessToken,
        },
        data: time,
      })
        .then(function (res) {
          if (submitted > 0) {
            console.log("modal recieve data");
            console.log(res.data["EventList"]);
            setCardInfo([...cardInfo, ...res.data["EventList"]]);
            setDisable(true);
            setLockButtStyle("#535353");
          }
        })
        .catch(function (error) {
          console.log("error!!");
          console.log(error);
        })
        .then(function () {
          // always executed
        });
  }, [submitted]);

  useEffect(() => {
    axios({
      method: "get",
      url: globalApi.isAdmin,
      headers: {
        authorization: "Bearer " + userData.accessToken,
      },
    })
      .then(function (res) {
        setIsAdmin(res.data["isAdmin"]);
      })
      .catch(function (error) {
        console.log("error!!");
        console.log(error);
      });
  });

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
  // const onFilterSubmit = (filter_props) => {
  //   console.log("get props from child compo");
  //   setJoinEventFilterProps(filter_props);
  // };

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

  console.log(cardInfo);
  console.log(Object.keys(cardInfo).length);

  let filteredEvents =
    Object.keys(cardInfo).length !== 0 &&
    cardInfo.filter((event) => {
      console.log(event.name);
      return event.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

  return (
    <div className="backG">
      {!isAdmin && (
        <MMheader
          name="Event Feed"
          navName=""
          isAdmin={isAdmin}
          notificationState={notificationState}
          setNotificationModalState={setNotificationModalState}
          dropdownState={dropdownState}
          setDropdownState={setDropdownState}
        />
      )}
      {isAdmin && (
        <MMheader
          name="Manage Event"
          navName="Verify Request"
          toBeNavi="/v"
          isAdmin={isAdmin}
          notificationState={notificationState}
          setNotificationModalState={setNotificationModalState}
        />
      )}
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
        // onFilterSubmit={onFilterSubmit}
        mState={modalstate}
        setMState={setModalstate}
        onClose={setModalClose}
        setEvent={setCardInfo}
        setNumPage={setNumPage}
        submitted={submitted}
        setSubmitted={setSubmitted}
        setTime={setTime}
      />

      <NotificationModal
        notificationState={notificationState}
        setNotificationModalState={setNotificationModalState}
      />
      
      <Dropdown
        dropdownState={dropdownState}
        setDropdownState={setDropdownState}
      />

      <Cards events={filteredEvents} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="loadButt"
          disable={disable}
          onClick={() => setNumPage(numPage + 1)}
          style={{ backgroundColor: lockButtStyle }}
        >
          Load events
        </button>
      </div>

      {/* <div style="height:700px;overflow:auto;">
        <InfiniteScroll
          pageStart={1}
          loadMore={loadFunc}
          hasMore={true || false}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          useWindow={false}
        >
          {items}
        </InfiniteScroll>
      </div> */}
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
