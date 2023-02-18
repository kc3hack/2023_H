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
        <ScheduleTime />
        <Weather />
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Button
            className="scheduleButton"
            onClick={() => {
              navigate(`${process.env.PUBLIC_URL}/schedule`);
            }}
            variant="outlined"
            size="large"
          >
            予定情報
          </Button>
          <br />
          <Button
            className="trafficButton"
            onClick={() => {
              navigate(`${process.env.PUBLIC_URL}/traffic`);
            }}
            variant="outlined"
            size="large"
          >
            遅延情報
          </Button>
          {/*<Schedule calendarID={calendarID} APIkey={APIkey}/>*/}
        </Grid>
      </div>

    </>
  );
}

export default Top;
