//React Necessities
import React, { useState } from "react";

//Assets
import quitimg from "../../Assets/img/close.png";

//Style
import "./LocationButton.css";

const LocationButton = (props) => {
  const [selectingmode, setselectingmode] = useState(false);
  const modehandlerenter = (e) => {
    setselectingmode(true);
  };
  const modehandlerquit = (e) => {
    setselectingmode(false);
  };
  return (
    <div
      className="locationButton"
      onMouseEnter={modehandlerenter}
      onMouseLeave={modehandlerquit}
    >
      <div className={`val ${selectingmode && "valselect"}`}>
        {props.location}
      </div>
      <div
        onClick={props.onDeleteAction}
        className={`quitbutton ${selectingmode ? "visible" : "hidden"}`}
      >
        <img src={quitimg}></img>
      </div>
    </div>
  );
};

export default LocationButton;
