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

import nuke from "../asset/nuclear.png";
import weed from "../asset/weed.jpg";
import dota from "../asset/dota2_social.jpg";
import ayaya from "../asset/ayaya.jpeg";
import weeb from "../asset/weeb.jpg";
import girl from "../asset/girl_night.jpg";
import uno from "../asset/uno.jpg";
import john from "../asset/John.jpg";

function JoinComponent() {
  const [cardInfo, setCardInfo] = useState({
    events: [
      {
        id: 9,
        title: "Nuclear Discuss",
        date: "Mon 28 February",
        place: "Pathumwan99, Bangkok",
        imgSrc: nuke,
      },
      {
        id: 2,
        title: "Weed party",
        date: "Wed 9 March",
        place: "54 ซอย ลาดพร้าว 1 Chom Phon, Chatuchak, Bangkok 10900",
        imgSrc: weed,
      },
      {
        id: 3,
        title: "Dota2 Time",
        date: "Fri 1 April",
        place: "39 1 Chatuchak, Bangkok 10900",
        imgSrc: dota,
      },
      {
        id: 4,
        title: "Ayaya Ayaya",
        date: "Fri 14 January",
        place:
          "126/1 Vibhavadi Rangsit Rd, แขวง รัชดาภิเษก Din Daeng, Bangkok 10400",
        imgSrc: ayaya,
      },
      {
        id: 5,
        title: "Weebo party",
        date: "Mon 28 February",
        place:
          "2 Soi Phetchaburi 47 Yaek 10, Bang Kapi, Huai Khwang, Bangkok 10310",
        imgSrc: weeb,
      },
      {
        id: 6,
        title: "Girl Night",
        date: "Sun 30 March",
        place:
          "291 Lat Phrao 101 Rd, Khlong Chan, Bang Kapi District, Bangkok 10240",
        imgSrc: girl,
      },
      {
        id: 7,
        title: "Uno time",
        date: "Sun 6 February",
        place: "3333 Rama IV Rd, Khlong Toei, Bangkok 10110",
        imgSrc: uno,
      },
      {
        id: 8,
        title: "John Wick Training",
        date: "Wed 9 March",
        place:
          "944 Rama IV Rd, เเขวง วังใหม่ Pathum Wan District, Bangkok 10330",
        imgSrc: john,
      },
    ],
  });

  const [search, setSearch] = useState("");
  const [modalstate, setModalstate] = useState(false);
  const [joinEventFilterProps, setJoinEventFilterProps] = useState({});

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

  let filteredEvents = cardInfo.events.filter((event) => {
    return event.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  return (
    <div className="backG">
      <MMheader />
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
