import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import weatherCodes from "./weatherCodes.json";
import LocationCodes from "./location.json";
import "./weather.css";
import { Button } from "@mui/material";

reportWebVitals();

// TODO: 地域の設定は地域コードを使用するように

function Weather() {
  let dialog = document.getElementById("location-setting-dialog");
  const [weather, setWeather] = useState("");
  const [weather_id, setWeatherId] = useState("");
  const [weather_icon_url, setWeatherIconUrl] = useState("");
  const [weather_temperature_max, setWeatherTemperatureMax] = useState("-℃");
  const [weather_temperature_min, setWeatherTemperatureMin] = useState("-℃");
  const [weather_description, setWeatherDescription] = useState(
    "天気情報を取得できていない可能性があります。"
  );

  // ここから地点の設定
  // ローカルストレージに保存されている地点名を取得しある場合は表示
  useEffect(() => {
    const saved_location_name = localStorage.getItem("LocationName");
    if (saved_location_name) {
      document.getElementById("location-name").textContent =
        saved_location_name;
    }
  }, []);

  // 地点の設定/ダイアログの表示ボタンを押された際に処理される関数
  function handleLocationSettingClick() {
    dialog = document.getElementById("location-setting-dialog");
    dialog.showModal();
  }

  // 地点の設定/ダイアログの閉じるボタンを押された際に処理される関数
  function handleLocationSettingCloseClick() {
    let select = document.getElementById("location-select");
    let selected_option = select.options[select.selectedIndex];
    let selected_value = selected_option.value;
    document.getElementById("location-name").textContent = selected_value;
    localStorage.setItem(
      "LocationName",
      document.getElementById("location-name").textContent
    );
    dialog.close();
    window.location.reload();
  }

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
      return(
        <div>
          <p>地域が設定されていませされていません。</p>
        </div>
      );
    }

    return (
      <div id="weather">
        <div id="weather-icon">
          <img src={weather_icon_url} alt="weather-icon" />
        </div>
        <div id="weather-temperature-max">
          最高気温：{weather_temperature_max}
        </div>
        <div id="weather-temperature-min">
          最低気温：{weather_temperature_min}
        </div>

        <div id="weather-description">詳細情報：{weather_description}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>天気画面</h1>

      <div id="location">
        <h2 id="location-name">地域が設定されていません</h2>
        <div id="location-setting">
          <dialog id="location-setting-dialog">
            <p>地域を設定</p>
            <select id="location-select">{writeLocationSelection()}</select>
            <Button
              onClick={handleLocationSettingCloseClick}
              variant="contained"
              
            >
              閉じる
            </Button>
          </dialog>
          <Button
            id="location-setting-button"
            onClick={handleLocationSettingClick}
            variant="outlined"
          >
            ✐
          </Button>
        </div>
      </div>

      {/* 天気 */}
      {writeWeather()}
    </div>
  );
}

export default Weather;
