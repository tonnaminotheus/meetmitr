import React, { Component } from "react";
import "./MMheader.css";
import icon from "../asset/icon.png";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class MMheader extends Component {
  state = {};

  // constructor() {
  //   super();
  //   this.state = {
  //     search: "",
  //   };
  // }

  // updateSearch(event) {
  //   this.setState({ search: event.target.value.substr(0, 20) });
  // }

  render() {
    return (
      //let filterEvent = this.props.events;
      <div className="MMbar">
        <Row>
          <Col>
            <img src={icon} alt="" className="iconImg"></img>
          </Col>
          <Col xs={8} className="feedHead">
            <h1 className="feedHeader">Event Feed</h1>
          </Col>
          <Col></Col>
        </Row>
      </div>
    );
  }
}

export default MMheader;
