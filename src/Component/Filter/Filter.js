// React Necessities
import React, { useEffect, useState } from "react";

//Slider React
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

//assets
import bg from "../../Assets/svg/bg4.svg";
import arrow from "../../Assets/img/down-arrow.png";

//Styles
import "./Filter.css";
import LocationButton from "../LocationButton/LocationButton";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Filter = (props) => {
  const [language, setLanguage] = useState("en");
  const [isFilter, setisFilter] = useState(false);
  const [birthDateRange, setbirthDateRange] = useState([-100, 2000]);
  const [location, setLocation] = useState([]);
  const [currentLocation,setCurrentLocation] = useState("");

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
    if(!location.includes(currentLocation)){
      setLocation((old) => [...old, currentLocation]);
    }
    setCurrentLocation("");
  };

  const handleLocationDisable = (e,val) => {
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
  return (
    <React.Fragment>
      <div
        className={`filterdiv ${isFilter ? "filtervisible" : "filterhidden"}`}
      >
        <div className="filtercontent">
          <div className={`filter`}>
            <label htmlFor="select-language">Select Language: </label>
            <select
              onChange={languageHandler}
              name="language"
              id="language"
              value={language}
            >
              <option value="de">deutsch</option>
              <option value="en">english</option>
              <option value="es">español</option>
              <option value="fr">français</option>
            </select>
          </div>
          <div className={`filter`}>
            <label htmlFor="selectBirtDate">Select Birthdate: </label>
            <Range
              min={-100}
              max={2000}
              step={100}
              allowCross={false}
              defaultValue={[100, 1500]}
              dots={true}
              onChange={birthDateHandler}
              tipFormatter={(value) =>
                `${value < 0 ? `${-value} b.C.` : `${value} a.C.`}`
              }
              marks={{
                [-100]: `${"100 b.C."}`,
                [2000]: `${"2000 a.C."}`,
              }}
              tipProps={{
                placement: "top",
                visible: true,
              }}
            />
            <br />
            <br />
          </div>
          <div className={`filter `}>
            <form onSubmit={locationHandler}>
            <label htmlFor="selectLocation">Select Location: </label>
            <input
              type="text"
              id="input_location"
              name="location"
              placeholder="Location"
              value={currentLocation}
              onChange={(e) => {setCurrentLocation(e.target.value)}}
            />
            <button type="submit">Add</button>
            </form>
          </div>
          <div className="filtercontainer">
            {location.map((loc) => {
              return (
                <LocationButton location={loc} onDeleteAction={(e) => handleLocationDisable(e,loc)}/>
              );
            })}
          </div>
          <div className={`submitButton`}>
            <button onClick={submitHandler}>Submit</button>
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
