import React, { Component } from "react";
import nuke from "../asset/nuclear.png";
import EventCard from "./card";
import "./card.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

class Cards extends Component {
  state = {};

  render() {
    return (
      <div>
        <Container>
          {" "}
          <Row xs={1} md={2} xl={3} xxl={3} className="g-4">
            {this.props.events.map((card) => (
              // <h1>ayaya</h1>
              // <EventCard />
              <EventCard
                key={card.id}
                imgSource={this.props.srcURL}
                events={card}
              />
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Cards;
