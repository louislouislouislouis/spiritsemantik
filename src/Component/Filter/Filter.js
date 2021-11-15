// React Necessities
import React, { useEffect, useState } from "react";

//Slider React
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

//assets
import bg from "../../Assets/svg/bg4.svg";
import arrow from "../../Assets/img/down-arrow.png";

//Custom Component
import LocationButton from "../LocationButton/LocationButton";

//Styles
import "./Filter.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Filter = (props) => {
  const [language, setLanguage] = useState("en");
  const [isFilter, setisFilter] = useState(false);
  const [birthDateRange, setbirthDateRange] = useState([-100, 2000]);
  const [location, setLocation] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");

  const languageHandler = (e) => {
    setLanguage(e.target.value);
  };

  const filterHandler = (e) => {
    setisFilter((old) => !old);
  };

  const birthDateHandler = (data) => {
    console.log(data);
    setbirthDateRange(data);
  };

  const locationHandler = (e) => {
    e.preventDefault();
    if (
      !location.includes(
        currentLocation.charAt(0).toUpperCase() +
          currentLocation.slice(1).toLowerCase()
      )
    ) {
      setLocation((old) => [
        ...old,
        currentLocation.charAt(0).toUpperCase() +
          currentLocation.slice(1).toLowerCase(),
      ]);
    }
    setCurrentLocation("");
  };

  const handleLocationDisable = (e, val) => {
    if (location.includes(val)) {
      setLocation(location.filter((lieu) => lieu !== val));
    }
  };

  useEffect(() => {
    console.log("location mit useEffect: ");
  }, [location]);

  const submitHandler = (e) => {
    console.log("submitted");

    props.onSubmitFilter({
      currentLanguage: language,
      currentBirthDateRange: birthDateRange,
      currentLocation: location,
    });
  };
  const resetandSubmitHandler = (e) => {
    console.log("submitted");
    setCurrentLocation("");
    setLanguage("en");
    setLocation([]);
    setbirthDateRange([-100, 2000]);
    props.onSubmitFilter({
      currentLanguage: language,
      currentBirthDateRange: birthDateRange,
      currentLocation: location,
    });
  };
  return (
    <React.Fragment>
      <div
        className={`filterdiv ${isFilter ? "filtervisible" : "filterhidden"}`}
      >
        <div className="filtercontent">
          <div className="title">Filter</div>
          <div className="separator"></div>
          <div className="option">
            <label>Language</label>
            <select onChange={languageHandler} value={language}>
              <option value="de">Deutsch</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
          <div className="separator"></div>
          <div className="option">
            <label>Time:</label>
            <Range
              style={{
                marginTop: "50px",
                marginBottom: "50px",
                width: "90%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              min={-100}
              max={2000}
              allowCross={false}
              value={birthDateRange}
              onChange={birthDateHandler}
              tipFormatter={(value) => `${value}`}
              marks={{
                [-100]: `${"100 b.C."}`,
                [2000]: `${"2000 a.C."}`,
              }}
              tipProps={{
                placement: "top",
                visible: true,
              }}
            />
          </div>
          <div className="separator"></div>
          <div className="option">
            <label>Select Location: </label>
            <form onSubmit={locationHandler}>
              <input
                type="text"
                id="input_location"
                name="location"
                placeholder="Location"
                value={currentLocation}
                onChange={(e) => {
                  setCurrentLocation(e.target.value);
                }}
              />
            </form>
            <div className="filtercontainer">
              {location.map((loc) => {
                return (
                  <LocationButton
                    location={loc}
                    onDeleteAction={(e) => handleLocationDisable(e, loc)}
                  />
                );
              })}
            </div>
          </div>
          <div className={`submitButton`}>
            <div className="ButtonDiv b1" onClick={resetandSubmitHandler}>
              Reset
            </div>
            <div className="ButtonDiv b2" onClick={submitHandler}>
              Submit
            </div>
          </div>
        </div>
        <div className="filterButton">
          <div className="imgcontainer">
            <img
              onClick={filterHandler}
              src={arrow}
              alt=""
              className={`${isFilter && "rotated"}`}
            />
          </div>
        </div>
        <div className={`filter_bg`}>
          <img src={bg} alt="" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Filter;
