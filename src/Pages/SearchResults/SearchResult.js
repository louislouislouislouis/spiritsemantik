import React from "react";
import { useParams } from "react-router";

const SearchResult = () => {
  const params = useParams();
  console.log(params);
  return <div>{params.qid}</div>;
};

export default SearchResult;
