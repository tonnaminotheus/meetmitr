import { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import globalApi from "../globalApi";
import bg from "../asset/MeetmitrBgNoHead.png";
import Cookie from "universal-cookie";

const SkipButton = styled.button`
  background-color: #ffc229;
  color: white;
  border-radius: 15px;
  outline: 0;
  border: 0px;
  cursor: pointer;
  transition: ease background-color 250ms;
  height: 77px;
  width: 246px;
  margin-right: 10px;
  margin-left: 0px;
  font-size: 30px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  align-self: flex-end;
`;

const Select = styled.select`
  width: 400px;
  height: 60px;
  background: white;
  color: #000000;
  padding-left: 5px;
  margin-top: 20px;
  margin-right: 15px;
  font-size: 30px;
  font-weight: bold;
  font-family: "Titillium Web";
  border: 2px solid #c4c4c4;
  border-radius: 10px;
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

function PersonalQuiz() {
  let navigate = useNavigate();

  var cookies = new Cookie();
  var userData = cookies.get("cookie");
  const [onsite, setOnsite] = useState(0);
  const [weekday, setWeekday] = useState(0);
  const [people, setPeople] = useState(0);
  const [timeStart, setStartTime] = useState(
    moment().format("yyyy-MM-DD hh:mm:ss")
  );
  const [timeEnd, setEndTime] = useState(
    moment().format("yyyy-MM-DD hh:mm:ss")
  );
  const handleOnsiteChange = (event) => {
    setOnsite(event.target.value);
  };
  const handleWeekdayChange = (event) => {
    setWeekday(event.target.value);
  };
  const handlePeopleChange = (event) => {
    setPeople(event.target.value);
  };
  const handleTimeStartChange = (event) => {
    setStartTime(event.target.value);
  };
  const handleTimeEndChange = (event) => {
    setEndTime(event.target.value);
  };
  const finishQuiz = () => {
    axios({
      method: "POST",
      url: globalApi.postQuiz,
      headers: {
        authorization: userData.accessToken,
      },
      data: {
        onsite: onsite,
        weekend: weekday,
        people: people,
        startTime: timeStart,
        endTime: timeEnd,
      },
    })
      .then((respond) => {
        navigate("/quiz2");
      })
      .catch((error) => {
        navigate("/quiz2");
      });
  };
  return (
    <div
      className="quiz-page"
      style={{
        display: "flex",
        height: "100%",
        overflowY: "scroll",
        minHeight: "100vh",
        justifyContent: "center",
        backgroundImage: `url(${bg})`,
        backgroundColor: `#FFE5B9`,
        flexDirection: "column",
      }}
    >
      <div
        className="quiz-header"
        style={{
          borderRadius: "15px",
          backgroundColor: "#ffffff",
          marginTop: "150px",
          marginLeft: "250px",
          marginRight: "250px",
          padding: "50px",
        }}
      >
        <p
          style={{
            fontSize: "64px",
            margin: "0px",
            fontWeight: "bold",
            fontFamily: "Roboto, sans-serif",
            lineHeight: "64px",
          }}
        >
          PersonalQuiz
        </p>
        <p
          style={{
            fontSize: "36px",
            margin: "0px",
            fontWeight: "normal",
            fontFamily: "Roboto, sans-serif",
            lineHeight: "36px",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          This personality quiz will show you events that match your
          personality!
        </p>
        <div
          className="skip"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <SkipButton
            type="submit"
            onClick={() => {
              navigate("/feed");
            }}
          >
            Skip
          </SkipButton>
          <p
            style={{
              fontSize: "36px",
              margin: "0px",
              fontWeight: "normal",
              fontFamily: "Roboto, sans-serif",
              lineHeight: "36px",
            }}
          >
            Skip : You can retake personality quiz later
          </p>
        </div>
      </div>
      <div
        className="quiz-container"
        style={{
          borderRadius: "15px",
          backgroundColor: "#ffffff",
          marginTop: "50px",
          marginLeft: "250px",
          marginRight: "250px",
          padding: "50px",
        }}
      >
        <div className="1-question" style={{ marginBottom: "50px" }}>
          <p
            style={{
              fontSize: "40px",
              margin: "0px",
              fontWeight: "normal",
              fontFamily: "Roboto, sans-serif",
              lineHeight: "40px",
            }}
          >
            Do you prefer an online or an on-site event ?
          </p>
          <Select
            name="onsite"
            id="onsite"
            value={onsite}
            onChange={handleOnsiteChange}
          >
            <option value={0}>Online</option>
            <option value={1}>On-site</option>
            <option value={2}>Both</option>
          </Select>
        </div>
        <div className="2-question" style={{ marginBottom: "50px" }}>
          <p
            style={{
              fontSize: "40px",
              margin: "0px",
              fontWeight: "normal",
              fontFamily: "Roboto, sans-serif",
              lineHeight: "40px",
            }}
          >
            Do you prefer to join event on weekday or weekend ?
          </p>
          <Select
            name="weekday"
            id="weekday"
            value={weekday}
            onChange={handleWeekdayChange}
          >
            <option value={0}>Weekday</option>
            <option value={1}>weekend</option>
            <option value={2}>both</option>
          </Select>
        </div>
        <div className="3-question" style={{ marginBottom: "50px" }}>
          <p
            style={{
              fontSize: "40px",
              margin: "0px",
              fontWeight: "normal",
              fontFamily: "Roboto, sans-serif",
              lineHeight: "40px",
            }}
          >
            How many people in event do you prefer ?
          </p>
          <Select
            name="people"
            id="people"
            value={people}
            onChange={handlePeopleChange}
          >
            <option value={0}>0-10</option>
            <option value={1}>10-50</option>
            <option value={2}>50-150</option>
            <option value={3}>No Limit</option>
          </Select>
        </div>
        <div
          className="4-question"
          style={{
            marginBottom: "50px",
          }}
        >
          <p
            style={{
              fontSize: "40px",
              margin: "0px",
              fontWeight: "normal",
              fontFamily: "Roboto, sans-serif",
              lineHeight: "40px",
            }}
          >
            Which Time do you prefer the event to start/end ?
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <p
              style={{
                fontSize: "30px",
                margin: "0px",
                fontWeight: "normal",
                fontFamily: "Roboto, sans-serif",
                lineHeight: "30px",
              }}
            >
              Time start:
            </p>
            <input
              type="datetime-local"
              placeholder=""
              value={timeStart}
              onChange={handleTimeStartChange}
              style={{
                height: "60px",
                width: "35%",
                border: "2px solid #c4c4c4",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                fontSize: "30px",
                fontWeight: "bold",
                fontFamily: "Titillium Web",
                paddingLeft: "10px",
                lineHeight: "30px",
                margin: "0px",
                color: " #000000",
              }}
            />
            <p
              style={{
                fontSize: "30px",
                margin: "0px",
                fontWeight: "normal",
                fontFamily: "Roboto, sans-serif",
                lineHeight: "30px",
              }}
            >
              Time end:
            </p>
            <input
              type="datetime-local"
              placeholder=""
              value={timeEnd}
              onChange={handleTimeEndChange}
              style={{
                height: "60px",
                width: "35%",
                border: "2px solid #c4c4c4",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                fontSize: "30px",
                fontWeight: "bold",
                fontFamily: "Titillium Web",
                paddingLeft: "10px",
                lineHeight: "30px",
                margin: "0px",
                color: " #000000",
              }}
            />
          </div>
        </div>
        <div className="Next" style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", flex: 1 }}></div>
          <SkipButton type="submit" onClick={finishQuiz}>
            Next
          </SkipButton>
        </div>
      </div>
    </div>
  );
}

export default PersonalQuiz;
