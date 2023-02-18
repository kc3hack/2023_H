import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Weather from "./Weather";
import Schedule from "./Schedule";
import ScheduleTime from "./ScheduleTime";
import { useNavigate } from "react-router-dom";

const calendarID = "282696404qq@gmail.com";
const APIkey = "AIzaSyB211YGz4rfmjrJIcf_9r036GvUsVqegtM";

reportWebVitals();

function Top() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        トップ画面
        <Weather />
        <button
          className="trafficButton"
          onClick={() => {
            navigate("/traffic");
          }}
        >
          遅延情報
        </button>
        <br />
        <button
          className="scheduleButton"
          onClick={() => {
            navigate("/schedule");
          }}
        >
          予定情報
        </button>
        {/*<Schedule calendarID={calendarID} APIkey={APIkey}/>*/}
        <ScheduleTime />
      </div>
    </>
  );
}

export default Top;
