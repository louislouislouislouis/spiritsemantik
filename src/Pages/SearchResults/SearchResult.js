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
import { createRequest } from "../../Assets/request/request_creator";
import LoadingCard from "../../Component/LoadinCard/LoadingCard";

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
    setresults([]);
    const filter = JSON.parse(
      new URLSearchParams(history.location.search).get("f")
    );
    console.log(filter);
    const requestHandler = async () => {
      console.log("A request has been sent");

      //create request with filter on url
      const filter = JSON.parse(
        new URLSearchParams(history.location.search).get("f")
      );
      const req = createRequest(
        "get_query_val",
        params.qid === "0" ? "" : params.qid,
        {
          ...(filter.location && { location: filter.location }),
          ...(filter.language && { language: filter.language }),
          ...(filter.birthDateRange && {
            time: {
              date1:
                filter.birthDateRange[0] < 100
                  ? "0001-01-01"
                  : filter.birthDateRange[0].toString() + "-01-01",
              date2:
                filter.birthDateRange[1] < 100
                  ? "0001-01-01"
                  : filter.birthDateRange[1].toString() + "-01-01",
            },
          }),
        }
      );

      const url =
        "http://dbpedia.org/sparql?query=" +
        encodeURIComponent(req) +
        "&format=json";
      console.log(req);
      try {
        const rep = await sendRequest(url);

        console.log(rep);
        setresults(rep.results.bindings);
        window.scrollTo({
          top: 600,
          behavior: "smooth",
        });
        console.log("rerr");
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [params.qid]);

  const onClickAction = (e) => {
    const filter = JSON.parse(
      new URLSearchParams(history.location.search).get("f")
    );
    history.push({
      pathname: `/${params.qid}/${e}`,
      search: `f=${encodeURIComponent(JSON.stringify(filter))}`,
    });
  };
  return (
    <React.Fragment>
      <div className="results_cards">
        {isLoading && <LoadingCard />}
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
        {results.length === 0 && (
          <CardResult
            title={"No result"}
            img={
              "https://static.cnews.fr/sites/default/files/styles/image_640_360/public/point1.jpg?itok=jGTH8XuS"
            }
            onClickAction={() => {}}
          />
        )}
      </div>
      {params.uid !== "0" && <Wiki url={params.uid} />}
    </React.Fragment>
  );
};

export default SearchResult;
