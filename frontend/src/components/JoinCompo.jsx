import React, { Component } from "react";
import Cards from "./cards";
import MMheader from "./MMheader";
import nuke from "../asset/nuclear.png";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./JoinCompo.css";

class JoinComponent extends Component {
  constructor() {
    super();
    this.state = {
      srcURL: nuke,
      search: "",
      events: [
        {
          id: 1,
          title: "Nuclear Discuss",
          date: "Mon 28 February",
          place: "Pathumwan99, Bangkok",
        },
        {
          id: 2,
          title: "Weed party",
          date: "Wed 9 March",
          place: "54 ซอย ลาดพร้าว 1 Chom Phon, Chatuchak, Bangkok 10900",
        },
        {
          id: 3,
          title: "Dota2 Time",
          date: "Fri 1 April",
          place: "39 1 Chatuchak, Bangkok 10900",
        },
        {
          id: 4,
          title: "Ayaya Ayaya",
          date: "Fri 14 January",
          place:
            "126/1 Vibhavadi Rangsit Rd, แขวง รัชดาภิเษก Din Daeng, Bangkok 10400",
        },
        {
          id: 5,
          title: "Weebo party",
          date: "Mon 28 February",
          place:
            "2 Soi Phetchaburi 47 Yaek 10, Bang Kapi, Huai Khwang, Bangkok 10310",
        },
        {
          id: 6,
          title: "Girl Night",
          date: "Sun 30 March",
          place:
            "291 Lat Phrao 101 Rd, Khlong Chan, Bang Kapi District, Bangkok 10240",
        },
        {
          id: 7,
          title: "Uno time",
          date: "Sun 6 February",
          place: "3333 Rama IV Rd, Khlong Toei, Bangkok 10110",
        },
        {
          id: 8,
          title: "John Wick Training",
          date: "Wed 9 March",
          place:
            "944 Rama IV Rd, เเขวง วังใหม่ Pathum Wan District, Bangkok 10330",
        },
      ],
    };
  }

  updateSearch(event) {
    // console.log(event.target.value);
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
    let filteredEvents = this.state.events.filter((event) => {
      return (
        event.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });
    return (
      <div>
        <MMheader />
        <Form.Group className="Searcher" controlId="exampleForm.ControlInput1">
          <Form.Label>Search Event Name</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="text"
                size="lg"
                placeholder="type event name"
                onChange={this.updateSearch.bind(this)}
              />
            </Col>
            <Col>
              <button className="btn btn-dark btn-lg">filter</button>
            </Col>
          </Row>
        </Form.Group>

        {/* <input
          type="text"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        ></input> */}

        <Cards events={filteredEvents} srcURL={this.state.srcURL} />
      </div>
    );
  }
}

export default JoinComponent;
