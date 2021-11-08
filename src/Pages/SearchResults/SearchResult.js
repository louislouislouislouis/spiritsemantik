import React from "react";
import { useParams } from "react-router";
const DUMMYCARD = [
  {
    bio: "Muhammad Ali — nom couramment retranscrit en français Mohamed Ali ou Mohammed Ali1 — né le 17 janvier 1942 à Louisville au Kentucky et mort le 3 juin 2016 à Scottsdale en Arizona2, est un boxeur américain évoluant en catégorie poids lourds, considéré comme un des plus grands boxeurs de tous les temps...",
    title: "Mohammed Ali",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/1280px-Muhammad_Ali_NYWTS.jpg",
  },
  {
    bio: "Muhammad Ali — nom couramment retranscrit en français Mohamed Ali ou Mohammed Ali1 — né le 17 janvier 1942 à Louisville au Kentucky et mort le 3 juin 2016 à Scottsdale en Arizona2, est un boxeur américain évoluant en catégorie poids lourds, considéré comme un des plus grands boxeurs de tous les temps...",
    title: "Mohammed Ali",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/1280px-Muhammad_Ali_NYWTS.jpg",
  },
  {
    bio: "Muhammad Ali — nom couramment retranscrit en français Mohamed Ali ou Mohammed Ali1 — né le 17 janvier 1942 à Louisville au Kentucky et mort le 3 juin 2016 à Scottsdale en Arizona2, est un boxeur américain évoluant en catégorie poids lourds, considéré comme un des plus grands boxeurs de tous les temps...",
    title: "Mohammed Ali",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/1280px-Muhammad_Ali_NYWTS.jpg",
  },
  {
    bio: "Muhammad Ali — nom couramment retranscrit en français Mohamed Ali ou Mohammed Ali1 — né le 17 janvier 1942 à Louisville au Kentucky et mort le 3 juin 2016 à Scottsdale en Arizona2, est un boxeur américain évoluant en catégorie poids lourds, considéré comme un des plus grands boxeurs de tous les temps...",
    title: "Mohammed Ali",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Muhammad_Ali_NYWTS.jpg/1280px-Muhammad_Ali_NYWTS.jpg",
  },
];
const SearchResult = () => {
  const params = useParams();
  return (
    <div className="results_cards">
      {DUMMYCARD.map((el) => {
        return <div>{el.bio}</div>;
      })}
    </div>
  );
};

export default SearchResult;
