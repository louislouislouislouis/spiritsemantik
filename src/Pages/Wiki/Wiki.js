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

  //new request every time url change - THUMBNAIL
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent based onurl");
      setrelated([]);
      const filter = JSON.parse(
        new URLSearchParams(history.location.search).get("f")
      );
      const thumbnail_req = createRequest(
        "get_thumbnail",
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
      /* const full_req = createRequest(
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
      ); */
      const url =
        "http://dbpedia.org/sparql?query=" +
        encodeURIComponent(thumbnail_req) +
        "&format=json";
      console.log(url);
      try {
        const rep = await sendRequest(url);
        console.log(rep);
        setresults((old) => {
          return {
            ...old,
            thumbnail: rep.results.bindings[0]
              ? rep.results.bindings[0].thumbnail.value
              : "https://scontent-mrs2-1.xx.fbcdn.net/v/t1.6435-9/242313308_102688658842312_8956396124070407017_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=X69VaVFxTj8AX9kYjlk&tn=KeUsfKAODnvUejmW&_nc_ht=scontent-mrs2-1.xx&oh=ff57379829f1fba45ee7751970f25ec9&oe=61AF30A7",
          };
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [location]);
  //new request every time url change - ABSTRACT
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent based onurl");
      setrelated([]);
      const filter = JSON.parse(
        new URLSearchParams(history.location.search).get("f")
      );
      const thumbnail_req = createRequest(
        "get_abstract",
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
      /* const full_req = createRequest(
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
      ); */
      const url =
        "http://dbpedia.org/sparql?query=" +
        encodeURIComponent(thumbnail_req) +
        "&format=json";
      console.log(url);
      try {
        const rep = await sendRequest(url);
        console.log(rep);
        setresults((old) => {
          return { ...old, abstract: rep.results.bindings[0].abstract.value };
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [location]);
  //new request every time url change - SEEALSO
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent based onurl");
      setrelated([]);
      const filter = JSON.parse(
        new URLSearchParams(history.location.search).get("f")
      );
      const thumbnail_req = createRequest(
        "get_seeAlso",
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
        encodeURIComponent(thumbnail_req) +
        "&format=json";
      console.log(url);
      try {
        const rep = await sendRequest(url);
        console.log(rep);
        setresults((old) => {
          return { ...old, seeAlso: rep.results.bindings };
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [location]);
  //new request every time url change - BIRTHDATE
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent based onurl");
      setrelated([]);
      const filter = JSON.parse(
        new URLSearchParams(history.location.search).get("f")
      );
      const thumbnail_req = createRequest(
        "get_birthDate",
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
        encodeURIComponent(thumbnail_req) +
        "&format=json";
      console.log(url);
      try {
        const rep = await sendRequest(url);
        console.log(rep);
        setresults((old) => {
          return { ...old, birthDate: rep.results.bindings };
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [location]);
  //new request every time url change - LABEL
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent based onurl");
      setrelated([]);
      const filter = JSON.parse(
        new URLSearchParams(history.location.search).get("f")
      );
      const thumbnail_req = createRequest(
        "get_label",
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
        encodeURIComponent(thumbnail_req) +
        "&format=json";
      console.log(url);
      try {
        const rep = await sendRequest(url);
        console.log(rep);
        setresults((old) => {
          return { ...old, label: rep.results.bindings };
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [location]);
  //new request every time url change - BIRTHNAME
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent based onurl");
      setrelated([]);
      const filter = JSON.parse(
        new URLSearchParams(history.location.search).get("f")
      );
      const thumbnail_req = createRequest(
        "getBirthName",
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
        encodeURIComponent(thumbnail_req) +
        "&format=json";
      console.log(url);
      try {
        const rep = await sendRequest(url);
        console.log(rep);
        setresults((old) => {
          return { ...old, birthName: rep.results.bindings };
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [location]);
  //new request every time url change - BIRTHPLACE
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent based onurl");
      setrelated([]);
      const filter = JSON.parse(
        new URLSearchParams(history.location.search).get("f")
      );
      const thumbnail_req = createRequest(
        "getBirthPlace",
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
        encodeURIComponent(thumbnail_req) +
        "&format=json";
      console.log(url);
      try {
        const rep = await sendRequest(url);
        console.log(rep);
        setresults((old) => {
          return { ...old, birthPlace: rep.results.bindings };
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [location]);
  //new request every time url change - DEATHDATE
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent based onurl");
      setrelated([]);
      const filter = JSON.parse(
        new URLSearchParams(history.location.search).get("f")
      );
      const thumbnail_req = createRequest(
        "getdeathDate",
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
        encodeURIComponent(thumbnail_req) +
        "&format=json";
      console.log(url);
      try {
        const rep = await sendRequest(url);
        console.log(rep);
        setresults((old) => {
          return { ...old, deathDate: rep.results.bindings };
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [location]);
  //new request every time url change - DEATHPLACE
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent based onurl");
      setrelated([]);
      const filter = JSON.parse(
        new URLSearchParams(history.location.search).get("f")
      );
      const thumbnail_req = createRequest(
        "getdeathPlace",
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
        encodeURIComponent(thumbnail_req) +
        "&format=json";
      console.log(url);
      try {
        const rep = await sendRequest(url);
        console.log(rep);
        setresults((old) => {
          return { ...old, deathPlace: rep.results.bindings };
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [location]);
  //new request every time url change - FEASTDAY
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent based onurl");
      setrelated([]);
      const filter = JSON.parse(
        new URLSearchParams(history.location.search).get("f")
      );
      const thumbnail_req = createRequest(
        "getfeast",
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
        encodeURIComponent(thumbnail_req) +
        "&format=json";
      console.log(url);
      try {
        const rep = await sendRequest(url);
        console.log(rep);
        setresults((old) => {
          return { ...old, feastDay: rep.results.bindings };
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [location]);
  //new request every time url change - SUCCESSOR
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent based onurl");
      setrelated([]);
      const filter = JSON.parse(
        new URLSearchParams(history.location.search).get("f")
      );
      const thumbnail_req = createRequest(
        "getsuccessor",
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
        encodeURIComponent(thumbnail_req) +
        "&format=json";
      console.log(url);
      try {
        const rep = await sendRequest(url);
        console.log(rep);
        setresults((old) => {
          return { ...old, successor: rep.results.bindings };
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [location]);
  //new request every time url change - VENERATED
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent based onurl");
      setrelated([]);
      const filter = JSON.parse(
        new URLSearchParams(history.location.search).get("f")
      );
      const thumbnail_req = createRequest(
        "getveneratedin",
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
        encodeURIComponent(thumbnail_req) +
        "&format=json";
      console.log(url);
      try {
        const rep = await sendRequest(url);
        console.log(rep);
        setresults((old) => {
          return { ...old, veneratedIn: rep.results.bindings };
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestHandler();
  }, [location]);

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
          <img src={results.thumbnail} alt="" />
          <div className="title">
            {results.label && results.label[0].label.value}
          </div>
        </div>
        <div className="content">
          <div className="bio">
            <div className="tittle">Bio</div>
            <div className="res">{results.abstract}</div>
          </div>
          {results.birthDate && results.birthDate.length > 0 && (
            <div className="bio">
              <div className="tittle">BirthDate</div>
              <div className="res">
                {results.birthDate.map((el) => {
                  return <div>{el.birthDate.value}</div>;
                })}
              </div>
            </div>
          )}
          {results.birthName && results.birthName.length > 0 && (
            <div className="bio">
              <div className="tittle">BirthName</div>
              <div className="res">
                {results.birthName.map((el) => {
                  return <div>{el.birthName.value}</div>;
                })}
              </div>
            </div>
          )}
          {results.birthPlace && results.birthPlace.length > 0 && (
            <div className="bio">
              <div className="tittle">BirthPlace</div>
              <div className="res">
                {results.birthPlace.map((el) => {
                  return (
                    <div>
                      <a href={el.birthPlace.value}> {el.birthPlace.value}</a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {results.deathDate && results.deathDate.length > 0 && (
            <div className="bio">
              <div className="tittle">DeathDate</div>
              <div className="res">
                {results.deathDate.map((el) => {
                  return <div>{el.deathDate.value}</div>;
                })}
              </div>
            </div>
          )}
          {results.deathPlace && results.deathPlace.length > 0 && (
            <div className="bio">
              <div className="tittle">DeathPlace</div>
              <div className="res">
                {results.deathPlace.map((el) => {
                  return (
                    <div>
                      <a href={el.deathPlace.value}> {el.deathPlace.value}</a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {results.feastDay && results.feastDay.length > 0 && (
            <div className="bio">
              <div className="tittle">Feast Day</div>
              <div className="res">
                {results.feastDay.map((el) => {
                  return <div>{el.feastDay.value}</div>;
                })}
              </div>
            </div>
          )}
          {results.successor && results.successor.length > 0 && (
            <div className="bio">
              <div className="tittle">Successor</div>
              <div className="res">
                {results.successor.map((el) => {
                  return <div>{el.successor.value}</div>;
                })}
              </div>
            </div>
          )}
          {results.veneratedIn && results.veneratedIn.length > 0 && (
            <div className="bio">
              <div className="tittle">Venerated in</div>
              <div className="res">
                {results.veneratedIn.map((el) => {
                  return <div>{el.veneratedIn.value}</div>;
                })}
              </div>
            </div>
          )}
          {results.seeAlso && results.seeAlso.length > 0 && (
            <div className="see_also">
              <div className="tittle">See Also</div>
              <div className="res">
                <div className="contenter">
                  {results.seeAlso.map((el) => {
                    return (
                      <div className="ext_container">
                        <CardResult
                          bio={el.abstract.value}
                          title={el.label.value}
                          img={
                            (el.thumbnail && el.thumbnail.value) ||
                            "https://scontent-mrs2-1.xx.fbcdn.net/v/t1.6435-9/60361870_1436634106479367_2780548783614722048_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=xNHddD0NgZsAX-YmW27&_nc_ht=scontent-mrs2-1.xx&oh=634f4de378ffc3558e5e22d5711535c6&oe=61B0B4BD"
                          }
                          onClickAction={() =>
                            onClickAction(el.seeAlso.value.substring(28))
                          }
                        />
                      </div>
                    );
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
