//React Necessities
import React, { useState, useEffect } from "react";

//Custom Component
import LineResult from "../Component/LineResult/LineResult";

//Custom Hooks
import { useHttpClient } from "../Hooks/http-hook";

//Style
import "./Home.css";

//Img
import star from "../Assets/img/star.png";
import wallet from "../Assets/img/wallet.png";
import chercher from "../Assets/img/chercher.png";

//Requests
import requests from "../Assets/json/request.json";

const Home = () => {
  //State Var
  const [searchValue, setsearchValue] = useState("");
  const [isFocus, setisFocus] = useState(false);
  const [previewResult, setpreviewResult] = useState({
    suggestions: [],
    preview: [],
  });

  // Http Manager
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //
  const submitHandler = async (e) => {
    e.preventDefault();
  };

  // New Request on every Change
  useEffect(() => {
    const requestHandler = async () => {
      const contenu_requete = requests.base_request;
      const full_req = contenu_requete.replace("$$$BASE_VAL$$$", searchValue);
      const url =
        "http://dbpedia.org/sparql?query=" +
        encodeURIComponent(full_req) +
        "&format=json";

      try {
        const rep = await sendRequest(url);
        console.log(rep);
        setpreviewResult((old) => {
          return { ...old, preview: rep.results.bindings };
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (searchValue) {
      requestHandler();
      setisFocus(true);
    } else {
      setisFocus(false);
      setpreviewResult({
        suggestions: [],
        preview: [],
      });
    }
  }, [searchValue]);

  console.log(previewResult);
  // Action Handler
  const changHandler = (e) => {
    setsearchValue(e.target.value);
  };

  return (
    <div className="mainPage">
      <div className="firstPlane">
        <img className="img_secondary_pane" src={star} alt="background" />
      </div>
      <div className={`mainPlane ${isFocus ? "plane_focus" : ""}`}>
        <div className="form">
          <form onSubmit={submitHandler} className="search_form">
            <div className="img_icon">
              <img src={chercher} alt="" />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={changHandler}
              placeholder="Search for a saint"
            />
          </form>
        </div>
        {previewResult.preview.length > 0 && (
          <React.Fragment>
            <span className="separator"></span>
            <div className="result">
              <div className="suggestions"></div>
              <div className="prev">
                <div className="label">Reliable results</div>
                {previewResult.preview.map((preview) => {
                  return (
                    <LineResult
                      result={preview.isValueOf.value.substring(28)}
                      type="Saint"
                    />
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
      <div className="lastPlane">
        <img className="img_secondary_pane" src={wallet} alt="background" />
      </div>
    </div>
  );
};

export default Home;
