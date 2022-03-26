import React, { useState, useEffect } from "react";
import globalApi from "../globalApi";
import { useNavigate } from "react-router-dom";
import "./PersonalityQuizRateForm.css";
import styled from "styled-components";
import axios from "axios";

import Cookies from "universal-cookie";

import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "./JoinCompo.css";
// import InputRange from "react-input-range";

const RateQuiz = (props) => {
  const cookies = new Cookies();
  let navigate = useNavigate();
  let accessToken = cookies.get("cookie").accessToken;
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

  //*** use this tagCate when select is disable*/
  // const [tagCate, setTagValue] = useState({
  //   1: "None",
  //   2: "None",
  //   3: "None",
  //   4: "None",
  //   5: "None",
  //   6: "None",
  // });

  //*** use this tagCate when select is enable*/
  const [tagCate, setTagValue] = useState({
    1: "game",
    2: "anime",
    3: "charity",
    4: "meme",
    5: "doujin",
    6: "sport",
  });

  const [choosedTag, setChoosedTag] = useState([]);

  const [tagRate, setTagRate] = useState({
    1: 5,
    2: 5,
    3: 5,
    4: 5,
    5: 5,
    6: 5,
  });

  const [tagScore, setTagScore] = useState({
    game: "0",
    anime: "0",
    charity: "0",
    meme: "0",
    doujin: "0",
    sport: "0",
  });

  function prepData() {
    for (let key in tagCate) {
      setTagScore((prevState) => {
        return {
          ...prevState,
          [tagCate[key]]: tagRate[key],
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
      game: parseInt(tagScore["game"]),
      anime: parseInt(tagScore["anime"]),
      charity: parseInt(tagScore["charity"]),
      meme: parseInt(tagScore["meme"]),
      doujin: parseInt(tagScore["doujin"]),
      sport: parseInt(tagScore["sport"]),
    };

    axios({
      method: "post",
      url: globalApi.rate,
      headers: {
        Authorization: "Bearer " + accessToken,
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
    // if (event.target.value == "None") {
    //   if (Object.keys(tagCate).length !== 0) {
    //     Object.keys(tagCate).map((key) => {});
    //   }
    // } else {
    // }

    prepData();
    console.log("show tagCate");
    console.log(tagCate);
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
          <Col xs={8} sm={6} lg={4} xxl={3}>
            <select
              value={tagCate[num]}
              name={num}
              onChange={handleTagChange}
              className="selectInput mmFont"
              disabled
            >
              <option value="None">None</option>
              {getSelect()}
            </select>
          </Col>
          <Col>
            <div>
              <span className="mmFont">0</span>
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
              <span className="mmFont">10</span>
              <span className="score mmFont">score: {tagRate[num]}</span>
            </div>
          </Col>
        </Row>
      </div>
    ));
    return (
      <div>
        <Row>
          <Col sm={3} lg={2}>
            <span className="mmFont">categories : </span>
          </Col>
          <Col>{cates}</Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="backG">
      <div className="container">
        <span className="rateText">
          Rate your preferred categories (Max 6 categories)
        </span>
        <div style={{ margin: 15 }}></div>
        <form id="rating" onSubmit={requestQuizRate}>
          {sixCate()}

          <Row>
            <Col xs={4} sm={6} md={7} lg={8} xl={9}>
              <p></p>
            </Col>
            <Col>
              <button
                type="submit"
                className="subButt"
                style={{}}
                onClick={() => {
                  // console.log(tagCate);
                  // console.log(tagRate);
                  prepData();
                }}
                onMouseEnter={() => {
                  // console.log(tagCate);
                  // console.log(tagRate);
                  prepData();
                }}
              >
                Submit
              </button>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};

export default RateQuiz;
