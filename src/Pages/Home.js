import React, { useState } from "react";
import { useHttpClient } from "../Hooks/http-hook";
import "./Home.css";
import fond from "../Assets/img/pexels-koolshooters-8513129.jpg";
import requests from "../Assets/json/request.json";
const Home = () => {
  //
  const [searchValue, setsearchValue] = useState("");
  // Http Manager
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //
  const submitHandler = async (e) => {
    e.preventDefault();

    const contenu_requete = requests.base_request;
    const full_req = contenu_requete.replace("$$$BASE_VAL$$$", searchValue);
    const url =
      "http://dbpedia.org/sparql?query=" +
      encodeURIComponent(full_req) +
      "&format=json";

    try {
      const rep = await sendRequest(url);
      console.log(rep);
    } catch {}
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
