//React Necessities
import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  useParams,
  useNavigate,
} from "react-router-dom";
//Custom Hooks
import { useHttpClient } from "../../Hooks/http-hook";

//Custom Component
import CardResult from "../../Component/CardsResult/CardResult";
import Wiki from "../Wiki/Wiki";

//Style
import "./SearchResult.css";

//Requests
import requests from "../../Assets/json/request.json";

//To change
const DUMMYCARD = [
  {
    bio: "Muhammad Ali — nom couramment retranscrit en français Mohamed Ali ou Mohammed Ali1 — né le 17 janvier 1942 à Louisville au Kentucky et mort le 3 juin 2016 à Scottsdale en Arizona2, est un boxeur américain évoluant en catégorie poids lourds, considéré comme un des plus grands boxeurs de tous les temps...",
    title: "Mohammed Ali",
    url: "monurl",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/1280px-Muhammad_Ali_NYWTS.jpg",
  },
  {
    bio: "Muhammad Ali — nom couramment retranscrit en français Mohamed Ali ou Mohammed Ali1 — né le 17 janvier 1942 à Louisville au Kentucky et mort le 3 juin 2016 à Scottsdale en Arizona2, est un boxeur américain évoluant en catégorie poids lourds, considéré comme un des plus grands boxeurs de tous les temps...",
    title: "Mohammed Ali",
    url: "monurl",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/1280px-Muhammad_Ali_NYWTS.jpg",
  },
  {
    bio: "Muhammad Ali — nom couramment retranscrit en français Mohamed Ali ou Mohammed Ali1 — né le 17 janvier 1942 à Louisville au Kentucky et mort le 3 juin 2016 à Scottsdale en Arizona2, est un boxeur américain évoluant en catégorie poids lourds, considéré comme un des plus grands boxeurs de tous les temps...",
    title: "Mohammed Ali",
    url: "monurl",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/1280px-Muhammad_Ali_NYWTS.jpg",
  },
  {
    bio: "Muhammad Ali — nom couramment retranscrit en français Mohamed Ali ou Mohammed Ali1 — né le 17 janvier 1942 à Louisville au Kentucky et mort le 3 juin 2016 à Scottsdale en Arizona2, est un boxeur américain évoluant en catégorie poids lourds, considéré comme un des plus grands boxeurs de tous les temps...",
    title: "Mohammed Ali",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/1280px-Muhammad_Ali_NYWTS.jpg",
    url: "monurl",
  },
];

const SearchResult = (props) => {
  const [results, setresults] = useState([]);

  //URL Navigation
  const navigate = useNavigate();

  //hhtp
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //url
  const params = useParams();

  //new request every time url change
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent");
      const contenu_requete = requests.prefix + requests.desc_request;
      const full_req = contenu_requete
          .replace("$$$BASE_VAL_LOWER$$$", params.qid.toLowerCase())
          .replace("$$$BASE_VAL_UPPER$$$", params.qid.charAt(0).toUpperCase() + params.qid.slice(1));
      const url =
        "http://dbpedia.org/sparql?query=" +
        encodeURIComponent(full_req) +
        "&format=json";

      try {
        const rep = await sendRequest(url);
        console.log(rep);
        setresults(rep.results.bindings);
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [params.qid]);

  const onClickAction = (e) => {
    console.log("ee");
    navigate(`/${params.qid}/${e}`);
  };
  console.log(results);
  return (
    <React.Fragment>
      <div className="results_cards">
        {results.map((el) => {
          return (
            <div className="ext_container">
              <CardResult
                bio={el.desc.value}
                title={el.label.value}
                img={
                  el.pic ? el.pic.value : "https://i.stack.imgur.com/6M513.png"
                }
                onClickAction={() => onClickAction(el.lien.value)}
              />
            </div>
          );
        })}
      </div>
      {params.uid !== "0" && <Wiki url={params.uid} />}
    </React.Fragment>
  );
};

export default SearchResult;
