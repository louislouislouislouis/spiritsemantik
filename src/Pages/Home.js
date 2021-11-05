import React, { useState } from "react";
import "./Home.css";
import fond from "../Assets/img/pexels-koolshooters-8513129.jpg";
const Home = () => {
  const [searchValue, setsearchValue] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(searchValue);
  };
  const changHandler = (e) => {
    setsearchValue(e.target.value);
  };
  return (
    <div className="mainPage">
      <div className="bg">
        <img src={fond} alt="background" />
      </div>
      <div className="center">
        <div className="title">Choose your Saint</div>
        <div className="formcontainer">
          <form onSubmit={submitHandler} className="formcontent">
            <input type="text" value={searchValue} onChange={changHandler} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
