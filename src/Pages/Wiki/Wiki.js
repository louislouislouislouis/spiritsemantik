import React, { useEffect, useState } from "react";
import CardResult from "../../Component/CardsResult/CardResult";
import "./Wiki.css";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../Hooks/http-hook";
import requests from "../../Assets/json/request.json";

const DUMMY_INF = {
  bio: "Muhammad Ali — nom couramment retranscrit en français Mohamed Ali ou Mohammed Ali1 — né le 17 janvier 1942 à Louisville au Kentucky et mort le 3 juin 2016 à Scottsdale en Arizona2, est un boxeur américain évoluant en catégorie poids lourds, considéré comme un des plus grands boxeurs de tous les temps...",
  title: "Mohammed Ali",
  url: "monurl",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/1280px-Muhammad_Ali_NYWTS.jpg",
  related: [
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
  ],
};
const Wiki = () => {
  //hhtp
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //url
  const params = useParams();
  const [results, setresults] = useState([]);
  //new request every time url change
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent");
      const contenu_requete = requests.detail_request;
      const full_req = contenu_requete.replaceAll(
        "$$$BASE_VAL$$$",
        "http://dbpedia.org/resource/" + params.uid
      );
      console.log(full_req);
      const url =
        "http://dbpedia.org/sparql?query=" +
        encodeURIComponent(full_req) +
        "&format=json";

      try {
        const rep = await sendRequest(url);
        console.log(rep);
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [params.qid]);
  return (
    <div className="wiki">
      <div className="big_card">
        <div className="wheader">
          <img src={DUMMY_INF.img} alt="" />
          <div className="title">{DUMMY_INF.title}</div>
        </div>
        <div className="content">
          <div className="bio">
            <div className="tittle">BIO</div>
            <div className="res">{DUMMY_INF.bio}</div>
          </div>
          <div className="see_also">
            <div className="tittle">See Also</div>
            <div className="res">
              <div className="contenter">
                {DUMMY_INF.related.map((el) => {
                  return (
                    <div className="ext_container">
                      <CardResult
                        bio={el.bio}
                        title={el.title}
                        img={el.img}
                        onClickAction={() => console.log("rr")}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wiki;
