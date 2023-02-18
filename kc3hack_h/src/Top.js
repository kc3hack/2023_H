import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Weather from "./Weather";
import ScheduleTime from "./ScheduleTime";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

reportWebVitals();

function Top() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        トップ画面
        <Weather />
        <Button
          className="trafficButton"
          onClick={() => {
            navigate("/traffic");
          }}
          variant="outlined"
        >
          遅延情報
        </Button>
        <br />
        <Button
          className="scheduleButton"
          onClick={() => {
            navigate("/schedule");
          }}
          variant="outlined"
        >
          予定情報
        </Button>
        {/*<Schedule calendarID={calendarID} APIkey={APIkey}/>*/}
        <ScheduleTime />
      </div>
    </>
  );
}

export default Top;
