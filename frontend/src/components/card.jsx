import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import nuke from "../asset/nuclear.png";
import "./card.css";

class EventCard extends Component {
  state = {};

  render() {
    return (
      <div className="cardTemplate">
        <Card>
          <Card.Img
            variant="top"
            src={this.props.imgSource}
            alt="event image"
          />
          <span className="cardTitleBg">Nuclear Discuss</span>
          <Card.Body>
            <Card.Text className="eventDate">Sat 06 November</Card.Text>
            <Card.Text className="eventPlace">Pathumwan99, Bangkok</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default EventCard;
