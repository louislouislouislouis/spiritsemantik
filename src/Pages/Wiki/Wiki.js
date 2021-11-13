//React Necessities
import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

//Custom Components
import CardResult from "../../Component/CardsResult/CardResult";

//Custom Hooks
import { useHttpClient } from "../../Hooks/http-hook";

//Request Creator
import { createRequest } from "../../Assets/request/request_creator";

//Styles
import "./Wiki.css";

const Wiki = () => {
  //Url logic
  const location = useLocation();
  const history = useHistory();
  const params = useParams();

  //custome http Hooks
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //State var
  const [results, setresults] = useState({});
  const [related, setrelated] = useState([]);

  //new request every time url change
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent based onurl");
      setrelated([]);
      const filter = JSON.parse(
        new URLSearchParams(history.location.search).get("f")
      );
      const full_req = createRequest(
        "get_details_info",
        "http://dbpedia.org/resource/" + params.uid,
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
  }, [location]);

  //Request to get related
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent base on first req");
      console.log(results);
      if (results.val && results.val.seeAlso) {
        const seeAlso = results.val.seeAlso.value.replace(/\s/g, "").split(",");
        for (let index = 0; index < seeAlso.length; index++) {
          const element = seeAlso[index];
          if (index < 5) {
            const filter = JSON.parse(
              new URLSearchParams(history.location.search).get("f")
            );
            const full_req = createRequest(
              "get_details_info",
              "http://dbpedia.org/resource/" + params.uid,
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
              encodeURIComponent(full_req) +
              "&format=json";
            try {
              const rep = await sendRequest(url);
              console.log(rep);
              setrelated((old) => {
                return [...old, { url: element, val: rep.results.bindings[0] }];
              });
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    };
    requestHandler();
  }, [results]);

  //Navigate with see Also
  const onClickAction = (e) => {
    const filter = JSON.parse(
      new URLSearchParams(history.location.search).get("f")
    );
    history.push({
      pathname: `/${params.qid}/${e}`,
      search: `f=${encodeURIComponent(JSON.stringify(filter))}`,
    });
  };

  //return to search page
  const quithandler = (e) => {
    console.log("ee");
    if (e.currentTarget === e.target) {
      const filter = JSON.parse(
        new URLSearchParams(history.location.search).get("f")
      );
      history.push({
        pathname: `/${params.qid}/0`,
        search: `f=${encodeURIComponent(JSON.stringify(filter))}`,
      });
    }
  };

  return (
    <div className="wiki" onClick={quithandler}>
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
            <div className="tittle">Bio</div>
            <div className="res">
              {results.val && results.val.abstract.value}
            </div>
          </div>
          {related.length > 0 && (
            <div className="see_also">
              <div className="tittle">See Also</div>
              <div className="res">
                <div className="contenter">
                  {related.map((el) => {
                    if (el.val) {
                      return (
                        <div className="ext_container">
                          <CardResult
                            bio={el.val.abstract.value}
                            title={el.val.label.value}
                            img={
                              el.val.thumbnail.value ||
                              "https://scontent-mrs2-1.xx.fbcdn.net/v/t1.6435-9/60361870_1436634106479367_2780548783614722048_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=xNHddD0NgZsAX-YmW27&_nc_ht=scontent-mrs2-1.xx&oh=634f4de378ffc3558e5e22d5711535c6&oe=61B0B4BD"
                            }
                            onClickAction={() =>
                              onClickAction(el.url.substring(28))
                            }
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wiki;
