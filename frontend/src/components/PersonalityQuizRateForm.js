import React, { useState, useEffect } from "react";
import globalApi from "../globalApi";
import { useNavigate } from "react-router-dom";
import "./PersonalityQuizRateForm.css";
import styled from "styled-components";
import axios from "axios";

import globalVar from "../cookie";
import Cookies from "universal-cookie";

import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "./JoinCompo.css";
// import InputRange from "react-input-range";

const RateQuiz = (props) => {
  const cookies = new Cookies();
  let navigate = useNavigate();
  let accessToken = globalVar.accessToken;
  // console.log("accessToken " + globalVar.accessToken);

  const [tags, setTags] = useState([
    "anime",
    "charity",
    "doujin",
    "game",
    "meme",
    "sport",
  ]);
  const numbers = [1, 2, 3, 4, 5, 6];

  //*** use this tagValue when select is disable*/
  // const [tagValue, setTagValue] = useState({
  //   1: "None",
  //   2: "None",
  //   3: "None",
  //   4: "None",
  //   5: "None",
  //   6: "None",
  // });

  //*** use this tagValue when select is enable*/
  const [tagValue, setTagValue] = useState({
    1: "game",
    2: "anime",
    3: "charity",
    4: "meme",
    5: "doujin",
    6: "sport",
  });

  const [tagRate, setTagRate] = useState({
    1: 5,
    2: 5,
    3: 5,
    4: 5,
    5: 5,
    6: 5,
  });

  const [tagScore, setTagScore] = useState({
    "game": "0",
    "anime": "0",
    "charity": "0",
    "meme": "0",
    "doujin": "0",
    "sport": "0",
  });

  function prepData() {
    for (let key in tagValue) {
      setTagScore((prevState) => {
        return {
          ...prevState,
          [tagValue[key]]: tagRate[key],
        };
      });
    }
    console.log("show tagScore");
    console.log(tagScore);
  }

  const requestQuizRate = (event) => {
    event.preventDefault();
    // prepData();
    const finalRating = {
      "game": parseInt(tagScore["game"]),
      "anime": parseInt(tagScore["anime"]),
      "charity": parseInt(tagScore["charity"]),
      "meme": parseInt(tagScore["meme"]),
      "doujin": parseInt(tagScore["doujin"]),
      "sport": parseInt(tagScore["sport"]),
    };

    axios({
      method: "post",
      url: globalApi.rate,
      headers: {
        "Authorization": "Bearer " + accessToken,
      },
      data: finalRating,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("200");

          navigate("/feed");
        } else {
          console.log(response.status);
        }
      })
      .catch(function (error) {
        console.log("error!!");
        console.log(error);

      });
  };

  const handleTagChange = (event) => {
    const { name, value } = event.target;
    setTagValue((prevState) => {
      return {
        ...prevState,
        [name]: event.target.value,
      };
    });
    prepData();
    console.log("show tagValue");
    console.log(tagValue);
  };

  const handleRangeChange = (event) => {
    const { name, value } = event.target;
    setTagRate((prevState) => {
      return {
        ...prevState,
        [name]: event.target.value,
      };
    });
    prepData();
    console.log("show tagRate");
    console.log(tagRate);
  };

  function getSelect() {
    const selectValue = tags.map((tag) => (
      <option value={tag} key={"tag-" + tag}>
        {tag}
      </option>
    ));
    return selectValue;
  }

  function sixCate() {
    const cates = numbers.map((num) => (
      <div key={num} className="CategoryInput">
        <Row>
          <Col xs={5} sm={4} lg={3} xxl={2}>
            <select
              value={tagValue[num]}
              name={num}
              onChange={handleTagChange}
              className="selectInput"

              disabled
            >
              <option value="None">None</option>
              {getSelect()}
            </select>
          </Col>
          <Col>
            <div>
              <span>0</span>
              <input
                type="range"
                min={0}
                max={10}
                value={tagRate[num]}
                name={num}
                step="1"
                onChange={handleRangeChange}
                className="Slider"
              ></input>
              <span>10</span>
              <span className="score">your score: {tagRate[num]}</span>
            </div>
          </Col>
        </Row>
      </div>
    ));
    return <div>{cates}</div>;
  }

  return (
    <div className="backG">
      <div className="container">
        <span className="rateText">
          Rate your preferred categories (Max 6 categories)
        </span>
        <form id="rating" onSubmit={requestQuizRate}>
          {sixCate()}

          <button
            type="submit"
            className="subButt btn btn-primary btn-lg"
            onClick={() => {

              // console.log(tagValue);
              // console.log(tagRate);
              prepData();
            }}
            onMouseEnter={() => {
              // console.log(tagValue);
              // console.log(tagRate);

              prepData();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RateQuiz;
