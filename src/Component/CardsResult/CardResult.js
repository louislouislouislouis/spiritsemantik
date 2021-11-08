//React Necessities
import React from "react";

//Style
import "./CardResult.css";
const CardResult = (props) => {
  return (
    <div className="cardcontainer" onClick={props.onClickAction}>
      <div className="header">
        <div className="img">
          <img src={props.img} alt="" />
        </div>
        <div className="title">{props.title}</div>
      </div>
      <span className="separator" />
      <div className="main_div">
        <p>{props.bio}</p>
      </div>
    </div>
  );
};

export default CardResult;
