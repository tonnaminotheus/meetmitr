import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "./card.css";
import { useState } from "react";
import globalApi from "../globalApi";
import axios from "axios";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

class EventCard extends Component {
  state = {
    eventInfo: {},
    tagss: {},
    style1: {
      display: "initial",
    },
    style2: {
      display: "none",
    },
    busy: 0,
  };

  componentDidMount() {
    axios.get(globalApi.eventDescription + this.props.id).then((res) => {
      console.log(res.data);
      this.setState({ eventInfo: res.data });
      // this.handleTag(res);
      // var tagData = res.data.tags;
      // var tag = "";
      // var i;
      // for (i = 0; i < tagData.length; i++) {
      //   tag += `<li>${tagData[i].name}</li>`;
      // }
      // this.setState({ tagss: tag });
    });
  }

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

  render() {
    const im = this.props.events.imgSrc;
    const { tagLi } = this.state.tagss;
    const { navigation } = this.props;

    return (
      <div>
        <Card
          className="cardTemplate"
          onClick={() => {
            console.log("clicked");
            this.props.navigation.navigate("/joinEvent", {
              eventId: this.state.eventInfo.eventId,
            });
          }}
        >
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
                {/* <li>yare</li>
                <li>yare</li>
                <li>daze</li> */}
              </ul>
            </div>
          </div>

          <span className="cardTitleBg">{this.state.eventInfo.name}</span>
          <Card.Body>
            <Card.Text className="eventDate">
              {this.state.eventInfo.startTime}
            </Card.Text>
            <Card.Text className="eventPlace">
              {this.state.eventInfo.province}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default EventCard;

// handleTag = (res) => {
//   console.log(this.state.eventInfo.tags);
//   if (this.state.eventInfo.tags) {
//     this.state.eventInfo.tags.maps((tag) => {
//       console.log(tag);
//     });
//   } else {
//     console.log("tag null");
//   }
// };

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

// useEffect(() => {
//   axios({
//     method: "GET",
//     url: globalApi.eventDescription + eventId,
//   })
//     .then((respond) => {
//       const attenNum = respond.data.participants.length;
//       const percent =
//         String((attenNum / respond.data.maxParticipant) * 100) + "%";

//       setEventData(respond.data);
//       setAttendance(attenNum);
//       setProgressData(percent);

//       const hostId = respond.data.creatorId;
//       axios({
//         method: "GET",
//         url: globalApi.userData + hostId,
//       })
//         .then((respond) => {
//           setHostData(respond.data);
//         })
//         .catch((error) => {});
//     })
//     .catch((error) => {});
// }, []);
