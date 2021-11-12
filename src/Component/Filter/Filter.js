// React Necessities
import React, { useEffect, useState } from "react";

//Slider React
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

//Styles
import "./Filter.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Filter = (props) => {
  const [language, setLanguage] = useState("en");
  const [isFilter, setisFilter] = useState(false);
  const [birthDateRange, setbirthDateRange] = useState([-100, 2000]);
  const [location, setLocation] = useState(["Paris", "Marseille", "Dresde"]);

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
    setLocation((old) => [
      ...old,
      document.getElementById("input_location").value,
    ]);
  };

  const submitHandler = (e) => {
    console.log("submitted");

    props.onSubmitFilteree({
      currentLanguage: language,
      currentBirthDateRange: birthDateRange,
      currentLocation: location,
    });
  };
  return (
    <React.Fragment>
      <div className="filterButton">
        <button onClick={filterHandler}>{`${
          isFilter ? "Hide Filter" : "Show Filter"
        }`}</button>
      </div>
      <div className={`filter ${isFilter ? "visible" : "hidden"}`}>
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
      <div className={`filter ${isFilter ? "visible" : "hidden"}`}>
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
      <div className={`filter ${isFilter ? "visible" : "hidden"}`}>
        <label htmlFor="selectLocation">Select Location: </label>
        <input
          type="text"
          id="input_location"
          name="location"
          placeholder="Location"
        />
        <button onClick={locationHandler}>Add</button>
      </div>
      <div className={`submitButton ${isFilter ? "visible" : "hidden"}`}>
        <button onClick={submitHandler}>Submit</button>
      </div>
      {location.map((loc) => {
        return <div>{loc}</div>;
      })}
    </React.Fragment>
  );
};

export default Filter;
