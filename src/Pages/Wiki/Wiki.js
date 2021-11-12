import React, { useEffect, useState } from "react";
import CardResult from "../../Component/CardsResult/CardResult";
import "./Wiki.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useHttpClient } from "../../Hooks/http-hook";
import requests from "../../Assets/json/request.json";

const Wiki = () => {
  const location = useLocation();
  //hhtp
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //url
  const params = useParams();
  const [results, setresults] = useState({});
  const [related, setrelated] = useState([]);
  //new request every time url change
  useEffect(() => {
    const requestHandler = async () => {
      setrelated([]);
      console.log("A request has been sent based onurl");
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
  }, [location]);

  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent base on first req");
      console.log(results);
      if (results.val && results.val.seeAlso) {
        const seeAlso = results.val.seeAlso.value.replace(/\s/g, "").split(",");
        for (let index = 0; index < seeAlso.length; index++) {
          const element = seeAlso[index];
          if (index < 5) {
            const contenu_requete = requests.detail_request;
            const full_req = contenu_requete.replaceAll(
              "$$$BASE_VAL$$$",
              "http://dbpedia.org/resource/" + element.substring(28)
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

  const onClickAction = (e) => {
    console.log("ee");
    //navigate(`/${params.qid}/${e}`);
  };
  const quithandler = (e) => {
    console.log("ee");
    if (e.currentTarget === e.target) {
      //navigate(`/${params.qid}/0`);
    }
  };

  console.log(related);
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
