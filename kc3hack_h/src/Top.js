import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Weather from "./Weather";
import ScheduleTime from "./ScheduleTime";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";

reportWebVitals();

function Top() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Weather />
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Button
            className="trafficButton"
            onClick={() => {
              navigate("/traffic");
            }}
            variant="outlined"
            size="large"
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
            size="large"
          >
            予定情報
          </Button>
          {/*<Schedule calendarID={calendarID} APIkey={APIkey}/>*/}
        </Grid>
        <ScheduleTime />
      </div>
    </>
  );
}

export default Top;
