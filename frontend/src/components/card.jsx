import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "./card.css";

class EventCard extends Component {
  state = {};

  render() {
    return (
      <div>
        <Card className="cardTemplate">
          <Card.Img
            variant="top"
            src={this.props.imgSource}
            alt="event image"
          />
          <span className="cardTitleBg">{this.props.events.title}</span>
          <Card.Body>
            <Card.Text className="eventDate">
              {this.props.events.date}
            </Card.Text>
            <Card.Text className="eventPlace">
              {this.props.events.place}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default EventCard;
