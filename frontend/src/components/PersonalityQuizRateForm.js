import React, { useState, useEffect } from "react";
import globalApi from "../globalApi";
import { useNavigate } from "react-router-dom";
import "./PersonalityQuizRateForm.css";
import styled from "styled-components";
import axios from "axios";

import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "./JoinCompo.css";
// import InputRange from "react-input-range";

const RateQuiz = (props) => {
  let navigate = useNavigate();
  const [tags, setTags] = useState([
    "Anime",
    "charity",
    "doujin",
    "game",
    "meme",
    "sport",
  ]);
  const numbers = [1, 2, 3, 4, 5, 6];
  const [tagValue, setTagValue] = useState({
    1: "None",
    2: "None",
    3: "None",
    4: "None",
    5: "None",
    6: "None",
  });

  const [tagRate, setTagRate] = useState({
    1: 5,
    2: 5,
    3: 5,
    4: 5,
    5: 5,
    6: 5,
  });

  //   useEffect(() => {
  //     let isMounted = true;
  //     axios.get(globalApi.tagsEvent).then((res) => {
  //       if (isMounted) {
  //         console.log(res.data);
  //         setTags(res.data);
  //       }
  //     });
  //     return () => {
  //       isMounted = false;
  //     };
  //   }, []);

  const handleTagChange = (event) => {
    const { name, value } = event.target;
    // console.log(name);
    setTagValue((prevState) => {
      return {
        ...prevState,
        [name]: event.target.value,
      };
    });
    // console.log(tagValue);
  };

  const handleRangeChange = (event) => {
    const { name, value } = event.target;
    // console.log(name);
    setTagRate((prevState) => {
      return {
        ...prevState,
        [name]: event.target.value,
      };
    });
    // console.log(tagRate);
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
        <form id="rating">
          {sixCate()}

          <button
            type="submit"
            className="subButt btn btn-primary btn-lg"
            onClick={() => {
              console.log(tagValue);
              console.log(tagRate);
              navigate("/feed");
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
