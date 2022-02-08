import React, { Component } from "react";
import nuke from "../asset/nuclear.png";
import EventCard from "./card";
import "./card.css";

class Cards extends Component {
  state = {
    srcURL: nuke,
    events: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  };

  render() {
    return (
      <div>
        {this.state.events.map((card) => (
          <EventCard key={card.id} imgSource={this.state.srcURL} />
        ))}
      </div>
    );
  }
}

export default Cards;
