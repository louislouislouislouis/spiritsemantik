//React Necessities
import React from "react";

import {
  BrowserRouter as Router,
  useParams,
  useNavigate,
} from "react-router-dom";

//Custom Component
import CardResult from "../../Component/CardsResult/CardResult";
import Wiki from "../Wiki/Wiki";

//Style
import "./SearchResult.css";

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

const SearchResult = () => {
  //URL Navigation
  const navigate = useNavigate();

  const onClickAction = (e) => {
    console.log("ee");
    navigate(`/${params.qid}/${e}`);
  };
  const params = useParams();
  return (
    <React.Fragment>
      <div className="results_cards">
        {DUMMYCARD.map((el) => {
          return (
            <div className="ext_container">
              <CardResult
                bio={el.bio}
                title={el.title}
                img={el.img}
                onClickAction={() => onClickAction(el.url)}
              />
            </div>
          );
        })}
      </div>
      {params.uid !== "0" && <Wiki />}
    </React.Fragment>
  );
};

export default SearchResult;
