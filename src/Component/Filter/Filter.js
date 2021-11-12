import React, {useEffect, useState} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Filter = (props) => {
    console.log(props);
    const [language, setLanguage] = useState("en");
    const [isFilter, setisFilter] = useState(false);
    const [birthDateRange, setbirthDateRange] = useState([100,1500]);

    const languageHandler = (e) => {
        setLanguage(e.target.value);
    }

//    useEffect(() => {console.log(language)},[language])

    const filterHandler = (e) => {
        setisFilter((old)=>!old);
    }

    const birthDateHandler = (e, data) => {
        setbirthDateRange(data);
    }

    const submitHandler = (e) => {
        console.log("submitted");
        this.props.setLanguage(language);
        this.props.setbirthDateRange(birthDateRange);
    }

    return (
            <React.Fragment>
            <div className="filterButton">
                <button onClick={filterHandler}>{`${isFilter?"Hide Filter":"Show Filter"}`}</button>
            </div>
            <div className={`filter ${isFilter?"visible":"hidden"}`}>
                <label htmlFor="select-language">Select Language: </label>
                <select onChange={languageHandler} name="language" id="language" value={language}>
                    <option value="de">deutsch</option>
                    <option value="en">english</option>
                    <option value="es">español</option>
                    <option value="fr">français</option>
                </select>
            </div>
            <div className={`filter ${isFilter?"visible":"hidden"}`}>
               <label htmlFor="selectBirtDate">Select Birthdate: </label>
                <Range min={-100} max={2000} step={100} allowCross={false}
                       defaultValue={[100,1500]}
                       dots={true}
                       onChange={birthDateHandler}
                />
            </div>
            <div className={`submitButton ${isFilter?"visible":"hidden"}`}>
                 <button onClick={submitHandler}>Submit</button>
            </div>


            </React.Fragment>

    );
};

export default Filter;