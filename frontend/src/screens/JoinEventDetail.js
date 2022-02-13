import "./JoinEventDetail.css";
import styled from "styled-components";
import logo from "../asset/icon.png";

function JoinEventDetail() {
  return (
    <div className="container">
      <div className="pic">
        <img className="logo" src={logo} alt="" />
      </div>
      <div className="detail">
        <div className="header">
          <div className="header-left">
            <h1>วิ่งแบบพพี่ตูน</h1>
            <p>6 November 11:00 - 13 November 12:00</p>
          </div>
          <div className="header-right">
            <img />
            <p>
              Pattharapon Srithong is <span>Host!</span>
            </p>
          </div>
        </div>
        <div className="status"></div>
        <div className="tabbar"></div>
      </div>
    </div>
  );
}

export default JoinEventDetail;
