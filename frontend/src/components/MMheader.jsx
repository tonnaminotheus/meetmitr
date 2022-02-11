import React, { Component } from "react";
import "./MMheader.css";

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
        <h1>Yooo header</h1>
      </div>
    );
  }
}

export default MMheader;
