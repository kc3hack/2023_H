import React, { useState, useEffect } from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

reportWebVitals();

// TODO: 天気情報の取得
// TODO: 地域の設定は地域コードを使用するように

function Weather() {
  // 地点の設定
  const [locationName, setLocationName] = useState("地点が設定されていません");

  useEffect(() => {
    const saved_location_name = localStorage.getItem("location_name");
    if (saved_location_name) {
      setLocationName(saved_location_name);
    }
  }, []);

  function handleLocationSettingClick() {
    alert("地点を設定します");
    setLocationName("地点が設定されました");
    localStorage.setItem("location_name", locationName);
  }

  // 天気情報の書き込み
  const [weather, setWeather] = useState(null);
  const [weather_icon_url, setWeatherIconUrl] = useState(null);
  const [weather_temperature_max, setWeatherTemperatureMax] = useState("-℃");
  const [weather_temperature_min, setWeatherTemperatureMin] = useState("-℃");
  const [weather_description, setWeatherDescription] = useState(
    "天気情報を取得できていない可能性があります。"
  );

  function writeWeather() {
    // 天気情報の取得
    // TODO: urlを動的に変更 地域コードを使用
    let weather_api_url = "https://www.jma.go.jp/bosai/forecast/data/forecast/";
    const area_code = "130000";

    fetch(weather_api_url + area_code + ".json")
      .then((response) => response.json())
      .then((weather_info) => {
        setWeather(weather_info[0].timeSeries[0].areas[0].weathers[2]);
        setWeatherTemperatureMax(weather_info[1].tempAverage.areas[0].max);
        setWeatherTemperatureMin(weather_info[1].tempAverage.areas[0].min);
      });

    weather_api_url =
      "https://www.jma.go.jp/bosai/forecast/data/overview_forecast/";

    fetch(weather_api_url + area_code + ".json")
      .then((response) => response.json())
      .then((weather_description) => {
        setWeatherDescription(weather_description["text"])
      });

    return (
      <div id="weather">
        <div id="weather-icon">
          <img src={weather_icon_url} alt="weather-icon" />
        </div>
        <div id="weather-temperature-max">最高気温：{weather_temperature_max}</div>
        <div id="weather-temperature-min">最低気温：{weather_temperature_min}</div>

        <div id="weather-description">詳細情報：{weather_description}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>天気画面</h1>

      <div id="location">
        <h2 id="location-name">{locationName}</h2>
        <div id="location-setting">
          <button
            id="location-setting-button"
            onClick={handleLocationSettingClick}
          >
            ✐
          </button>
        </div>
      </div>

      {/* 天気 */}
      {writeWeather()}
    </div>
  );
}

export default Weather;
