//React Necessities
import React, { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";
//Custom Hooks
import { useHttpClient } from "../../Hooks/http-hook";

//Custom Component
import CardResult from "../../Component/CardsResult/CardResult";
import Wiki from "../Wiki/Wiki";

//Style
import "./SearchResult.css";

//Requests
import requests from "../../Assets/json/request.json";

const SearchResult = (props) => {
  const [results, setresults] = useState([]);

  //URL Navigation

  //hhtp
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //url
  const params = useParams();
  const history = useHistory();
  //new request every time url change
  useEffect(() => {
    const filter = JSON.parse(
      new URLSearchParams(history.location.search).get("f")
    );
    console.log(filter);
    const requestHandler = async () => {
      console.log("A request has been sent");
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
      ////apply to filter state
      //setactive_filter(JSON.parse(params.get("f")));
      /* const req = createRequest("get_query_val", searchValue, {
        location: ["Test"],
        language: "en",
        time: { date1: "dr", date2: "ded" },
      }); */
      try {
        const rep = await sendRequest(url);
        console.log(rep);
        setresults(rep.results.bindings);
        console.log("rerr");
        window.scrollTo({
          top: 600,
          behavior: "smooth",
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [params.qid]);

  const onClickAction = (e) => {
    history.push(`/${params.qid}/${e}`);
  };
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
                  el.pic
                    ? el.pic.value
                    : "https://scontent-mrs2-2.xx.fbcdn.net/v/t1.6435-9/132803884_3675306175922204_633656899173464801_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=mMpMLojgemsAX-LHk5t&_nc_ht=scontent-mrs2-2.xx&oh=8908c538e8d2fb8a7bed85418ea765c5&oe=61AD16F9"
                }
                onClickAction={() => onClickAction(el.lien.value.substring(28))}
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
