import React from "react";
import "./Home.css";
import fond from "../Assets/img/pexels-koolshooters-8513129.jpg";
const Home = () => {
  return (
    <div className="mainPage">
      <div className="bg">
        <img src={fond} alt="" />
      </div>
      <div className="center">
        <div className="title">Choose your Saint</div>
        <div className="formcontainer">
          <form className="formcontent">
            <input type="text" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
