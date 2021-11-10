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
  const [results, setresults] = useState({});
  const [related, setrelated] = useState();
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
        console.log(rep.results.bindings[0]);
        setresults({ val: rep.results.bindings[0] });
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [params.qid]);
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent");
      console.log(results);
      if (results.val && results.val.seeAlso) {
        const seeAlso = results.val.seeAlso.replace(/\s/g, "").value.split(",");
        for (let index = 0; index < seeAlso.length; index++) {
          const element = seeAlso[index];
          if (index < 5) {
            const contenu_requete = requests.prefix + requests.desc_request;
            const full_req = contenu_requete
              .replace("$$$BASE_VAL_LOWER$$$", params.qid.toLowerCase())
              .replace(
                "$$$BASE_VAL_UPPER$$$",
                params.qid.charAt(0).toUpperCase() + params.qid.slice(1)
              );
            const url =
              "http://dbpedia.org/sparql?query=" +
              encodeURIComponent(full_req) +
              "&format=json";
          }
        }

        try {
          const rep = await sendRequest(url);
          setrelated(rep);
        } catch (error) {
          console.log(error);
        }
      }
    };
    requestHandler();
  }, [results]);

  console.log();
  return (
    <div className="wiki">
      <div className="big_card">
        <div className="wheader">
          <img
            src={
              (results.val && results.val.thumbnail.value) ||
              "https://scontent-mrs2-1.xx.fbcdn.net/v/t1.6435-9/242313308_102688658842312_8956396124070407017_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=X69VaVFxTj8AX9kYjlk&tn=KeUsfKAODnvUejmW&_nc_ht=scontent-mrs2-1.xx&oh=ff57379829f1fba45ee7751970f25ec9&oe=61AF30A7"
            }
            alt=""
          />
          <div className="title">{results.val && results.val.label.value}</div>
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
                {results.val &&
                  results.val.seeAlso.value.split(",").map((el) => {
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
