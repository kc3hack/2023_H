import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Weather from "./Weather";
import ScheduleTime from "./ScheduleTime";
import { useNavigate } from "react-router-dom";

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
