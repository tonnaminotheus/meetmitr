import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "./card.css";

class EventCard extends Component {
  state = {
    style1: {
      display: "initial",
    },
    style2: {
      display: "none",
    },
    busy: 0,
  };

  handleMouseIn = () => {
    console.log("mouse in");
    if (this.state.busy === 0) {
      this.setState({
        style2: { display: "initial" },
        style1: { display: "none" },
        busy: 1,
      });
      setTimeout(() => {
        this.setState({
          style1: { display: "initial" },
          style2: { display: "none" },
          busy: 0,
        });
      }, 3500);
    }
  };

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

  render() {
    const im = this.props.events.imgSrc;
    return (
      <div>
        {/* <h1>hwllo</h1> */}
        <Card className="cardTemplate">
          <div
            onMouseEnter={this.handleMouseIn}
            // onMouseOut={this.handleMouseOut}
            className="cardImg"
          >
            <div style={this.state.style1}>
              <Card.Img
                className="cardImg"
                variant="top"
                src={this.props.events.imgSrc}
                alt=""
              />
            </div>

            <div className="cardCate" style={this.state.style2}>
              <h2>Category</h2>
              <ul className="cardCateLi">
                <li>yare</li>
                <li>yare</li>
                <li>daze</li>
              </ul>
            </div>
          </div>

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
