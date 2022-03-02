import React, { Component } from "react";
import nuke from "../asset/nuclear.png";
import EventCard from "./card";
import "./card.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

class Cards extends Component {
  state = {};

  tp(val) {
    console.log(val);
  }

  render() {
    console.log(this.props.events);
    return (
      <div>
        <Container>
          {" "}
          <Row xs={1} md={2} xl={3} xxl={3} className="g-4">
            {Object.keys(this.props.events).length !== 0 &&
              Object.keys(this.props.events).map((key, index) => (
                <EventCard
                  key={this.props.events[key].eventId}
                  events={this.props.events[key]}
                />
              ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Cards;
