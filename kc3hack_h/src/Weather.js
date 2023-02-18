import React, { useState, useEffect } from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import weatherCodes from "./weatherCodes.json";
import LocationCodes from "./location.json";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

reportWebVitals();

// TODO: 地域の設定は地域コードを使用するように

function Weather() {
  const [weather, setWeather] = useState("");
  const [weather_id, setWeatherId] = useState("");
  const [weather_icon_url, setWeatherIconUrl] = useState("");
  const [weather_temperature_max, setWeatherTemperatureMax] = useState("-℃");
  const [weather_temperature_min, setWeatherTemperatureMin] = useState("-℃");
  const [weather_description, setWeatherDescription] = useState(
    "天気情報を取得できていない可能性があります。"
  );
  const [dialog_open, setDialogOpen] = useState(false);

  // Dialogの表示
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  // Dialogの非表示
  const handleDialogClose = () => {
    let select = document.getElementById("location-select");
    let selected_option = select.options[select.selectedIndex];
    let selected_value = selected_option.value;
    document.getElementById("location-name").textContent = selected_value;
    localStorage.setItem(
      "LocationName",
      document.getElementById("location-name").textContent
    );
    window.location.reload();
    setDialogOpen(false);
  };
  const handleDialogCancelClose = () => {
    setDialogOpen(false);
  };

  // ここから地点の設定
  // ローカルストレージに保存されている地点名を取得しある場合は表示
  useEffect(() => {
    const saved_location_name = localStorage.getItem("LocationName");
    if (saved_location_name) {
      document.getElementById("location-name").textContent =
        saved_location_name;
    }
  }, []);

  function writeLocationSelection() {
    let select_options = [];
    for (let index = 0; index < LocationCodes.length; index++) {
      if (LocationCodes[index].name === localStorage.getItem("LocationName")) {
        select_options.push(
          <option value={LocationCodes[index].name} selected>
            {LocationCodes[index].name}
          </option>
        );
      } else {
        select_options.push(
          <option value={LocationCodes[index].name}>
            {LocationCodes[index].name}
          </option>
        );
      }
    }

    return select_options;
  }

  // ここから天気情報の書き込み
  // 地点名から地点コードを取得する関数
  function nameToCodeFromLocation(params) {
    for (let index = 0; index < LocationCodes.length; index++) {
      if (LocationCodes[index].name === params) {
        return LocationCodes[index].code;
      }
    }
    return "000000";
  }

  // 天気情報の書き込み(変数に値を代入しHTMLで出力)
  function writeWeather() {
    // 天気情報の取得
    let weather_api_url = "https://www.jma.go.jp/bosai/forecast/data/forecast/";
    let area_code = "000000";

    if (localStorage.getItem("LocationName") !== null) {
      area_code = nameToCodeFromLocation(localStorage.getItem("LocationName"));
    } else {
      return (
        <Typography variant="h5">
          地域が設定されていません。設定を行ってください。
        </Typography>
      );
    }

    if (area_code !== "000000") {
      fetch(weather_api_url + area_code + ".json")
        .then((response) => response.json())
        .then((weather_info) => {
          setWeather(weather_info[0].timeSeries[0].areas[0].weathers[2]);
          setWeatherId(weather_info[0].timeSeries[0].areas[0].weatherCodes[0]);
          if (weather_id !== "") {
            setWeatherIconUrl(
              "https://www.jma.go.jp/bosai/forecast/img/" +
                weatherCodes[weather_id][0]
            );
          }
          setWeatherTemperatureMax(weather_info[1].tempAverage.areas[0].max);
          setWeatherTemperatureMin(weather_info[1].tempAverage.areas[0].min);
        });

      weather_api_url =
        "https://www.jma.go.jp/bosai/forecast/data/overview_forecast/";

      fetch(weather_api_url + area_code + ".json")
        .then((response) => response.json())
        .then((weather_description) => {
          setWeatherDescription(weather_description["text"]);
        });
    } else {
      return (
        <div>
          <Typography variant="h4">地域が設定されていません</Typography>
        </div>
      );
    }

    return (
      <div id="weather">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Card sx={{ maxWidth: 500 }}>
            <CardMedia
              sx={{ height: 300 }}
              image={weather_icon_url}
              title="weather-icon"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {weather}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                最高気温：{weather_temperature_max}
                <br></br>
                最低気温：{weather_temperature_min}
                <br></br>
                詳細情報：{weather_description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }

  return (
    <div id="feature-weather">
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <div id="location">
          <Grid container>
            <Grid item xs={10}>
              <Typography id="location-name" variant="h4"></Typography>
            </Grid>
            <Grid item xs={2}>
              <div id="location-setting">
                <Button variant="outlined" onClick={handleDialogOpen}>
                  ✐
                </Button>
                <Dialog
                  open={dialog_open}
                  onClose={handleDialogClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"地域の設定"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <select id="location-select">
                        {writeLocationSelection()}
                      </select>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                      保存
                    </Button>
                    <Button
                      onClick={handleDialogCancelClose}
                      color="primary"
                      autoFocus
                    >
                      閉じる
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Grid>
          </Grid>
        </div>

        {/* 天気 */}
        {writeWeather()}
      </Grid>
    </div>
  );
}

export default Weather;
