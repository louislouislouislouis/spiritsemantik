//React Necessities
import React from "react";

//Assets
import enter from "../../Assets/img/enter.png";

//style
import "./LineResults.css";

const LineResult = (props) => {
  return (
    <div
      className={`lineresults ${props.isSelected ? "lineresults_select" : ""}`}
    >
      <div className="right">
        <div className="type">
          <div className="text">{props.type || "Saint"}</div>
        </div>
        <div className="value"> {props.result}</div>
      </div>
      {props.isSelected && (
        <div className="left">
          <div className="selector">
            <div className="text">Select</div>
            <img src={enter} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LineResult;
