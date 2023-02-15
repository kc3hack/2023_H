import React, { useState } from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

reportWebVitals();

function Weather() {
  // 地点の設定
  const [locationName, setLocationName] = useState("地点が設定されていません");
  function handleLocationSettingClick() {
    alert("地点を設定します");
    setLocationName("地点が設定されました");
  }

  // 天気情報の書き込み
  const [weather, setWeather] = useState(null);
  const [weather_icon_url, setWeatherIconUrl] = useState(null);
  const [weather_temperature, setWeatherTemperature] = useState("-℃");
  const [weather_temperature_difference, setWeatherTemperatureDifference] = useState("-℃");
  const [weather_description, setWeatherDescription] = useState("天気情報を取得できていない可能性があります。");

  function writeWeather() {
    // 天気情報の取得
    // const weather_info = getWeatherInfo();

    return (
      <div id="weather">
        <div id="weather-icon">
          <img src={ weather_icon_url } alt="weather-icon" />
        </div>
        <div id="weather-temperature">{ weather_temperature }</div>

        {/* 前日との気温差 */}
        <div id="weather-temperature-difference">{ weather_temperature_difference }</div>

        <div id="weather-description">
          { weather_description }
        </div>
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
