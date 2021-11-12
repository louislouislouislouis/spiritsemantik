//React Necessities
import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  useLocation,
  useHistory,
} from "react-router-dom";

//Custom Component
import LineResult from "../../Component/LineResult/LineResult";
import Filter from "../../Component/Filter/Filter";

//Custom Hooks
import { useHttpClient } from "../../Hooks/http-hook";
import { useEventListener } from "../../Hooks/EventListener";

//Style
import "./Home.css";

//Img
import star from "../../Assets/img/star.png";
import wallet from "../../Assets/img/wallet.png";
import chercher from "../../Assets/img/chercher.png";

//Requests
import requests from "../../Assets/json/request.json";
import { createRequest } from "../../Assets/request/request_creator";

const Home = () => {
  //State Var
  const [searchValue, setsearchValue] = useState("");
  const [isFocus, setisFocus] = useState(false);
  const [abbleRequest, setabbleRequest] = useState(true);
  const [previewResult, setpreviewResult] = useState({
    suggestions: [],
    preview: [],
  });
  const [active_filter, setactive_filter] = useState({
    language: "en",
    birthDateRange: [-100, 2000],
    location: null,
  });

  //URL Navigation
  const history = useHistory();

  // Http Manager
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // New Request on every Change
  useEffect(() => {
    const requestHandler = async () => {
      console.log("A request has been sent");
      const contenu_requete = requests.prefix + requests.base_request;
      const full_req = contenu_requete
        .replace("$$$BASE_VAL_LOWER$$$", searchValue.toLowerCase())
        .replace(
          "$$$BASE_VAL_UPPER$$$",
          searchValue.charAt(0).toUpperCase() + searchValue.slice(1)
        );

      const url =
        "http://dbpedia.org/sparql?query=" +
        encodeURIComponent(full_req) +
        "&format=json";

      try {
        const rep = await sendRequest(url);

        setpreviewResult((old) => {
          let real_results = rep.results.bindings.map((el, index) => {
            return { val: el, isSelected: index === 0 };
          });
          return { ...old, preview: real_results };
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (searchValue) {
      if (abbleRequest) {
        requestHandler();
      }
    } else {
      setpreviewResult({
        suggestions: [],
        preview: [],
      });
    }
  }, [searchValue, abbleRequest, sendRequest]);

  // SELECT WITH ARROW_KEY
  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handler = useCallback(
    (e) => {
      if (e.code === "ArrowUp" || e.code === "ArrowLeft") {
        for (let index = 0; index < previewResult.preview.length; index++) {
          const element = previewResult.preview[index];
          if (element.isSelected && index > 0) {
            setpreviewResult((old) => {
              let new_prev = old.preview;
              new_prev[index].isSelected = false;
              new_prev[index - 1].isSelected = true;
              return { ...old, preview: new_prev };
            });
            setabbleRequest(false);
            setsearchValue(previewResult.preview[index - 1].val.label.value);
            e.stopPropagation();
            e.preventDefault();
            break;
          }
        }
      } else if (e.code === "ArrowDown" || e.code === "ArrowRight") {
        for (let index = 0; index < previewResult.preview.length; index++) {
          const element = previewResult.preview[index];
          if (element.isSelected && index < previewResult.preview.length - 1) {
            setpreviewResult((old) => {
              let new_prev = old.preview;
              new_prev[index].isSelected = false;
              new_prev[index + 1].isSelected = true;
              return { ...old, preview: new_prev };
            });
            setabbleRequest(false);
            setsearchValue(previewResult.preview[index + 1].val.label.value);
            e.stopPropagation();
            e.preventDefault();
            break;
          }
        }
      }
    },
    [setpreviewResult, previewResult]
  );
  useEventListener("keydown", handler);

  // Action Handler
  const changHandler = (e) => {
    setabbleRequest(true);
    setsearchValue(e.target.value);
  };
  const focusModeHandler = (e) => {
    if (previewResult.preview.length > 0) {
    } else {
      setisFocus(true);
    }
  };
  const defocusModeHandler = (e) => {
    if (previewResult.preview.length > 0) {
    } else {
      setisFocus(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    history.push({
      pathname: `/${searchValue}/0`,
      search: `f=${encodeURIComponent(JSON.stringify(active_filter))}`,
    });
  };
  const onhoverhandler = async (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    console.log("Filter has change! update url");
    history.push({
      pathname: `.`,
      search: `f=${encodeURIComponent(JSON.stringify(active_filter))}`,
    });
  }, [active_filter]);

  const submitFilterHandler = (e) => {
    console.log("la fonction submitFilterHandler a été appelé");
    setactive_filter((old) => {
      return {
        ...old,
        language: e.currentLanguage,
        birthDateRange: e.currentBirthDateRange,
        location: e.currentLocation,
      };
    });
  };
  return (
    <React.Fragment>
      <div className="firstPlane">
        <img className="img_secondary_pane" src={star} alt="background" />
      </div>
      <div className="lastPlane">
        <img className="img_secondary_pane" src={wallet} alt="background" />
      </div>
      <Filter onSubmitFilter={submitFilterHandler} />
      <div className="mainPage">
        <div className={`mainPlane ${isFocus ? "plane_focus" : ""}`}>
          <div
            className="form"
            onMouseEnter={focusModeHandler}
            onMouseLeave={defocusModeHandler}
          >
            <form onSubmit={submitHandler} className="search_form">
              <div className="img_icon">
                <img src={chercher} alt="" />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={changHandler}
                placeholder="Search for a saint"
              />
            </form>
          </div>
          {isFocus && (
            <React.Fragment>
              <span className="separator"></span>
              <div className="result">
                {previewResult.preview.length === 0 && !searchValue ? (
                  <div className="suggestions">
                    <div className="label">Precedent Searches</div>
                    {previewResult.preview.map((preview) => {
                      return (
                        <LineResult
                          result={preview.val.isValueOf.value.substring(28)}
                          type="Saint"
                          isSelected={preview.isSelected}
                          onHover={onhoverhandler}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="prev">
                    <div className="label">Reliable results</div>
                    {previewResult.preview.map((preview) => {
                      return (
                        <LineResult
                          result={preview.val.label.value}
                          type={
                            preview.val.titre.value.split(",")[0].split(" ")[0]
                          }
                          isSelected={preview.isSelected}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
