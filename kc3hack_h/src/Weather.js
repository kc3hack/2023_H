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

  // 天気の取得
  const [weather, setWeather] = useState(null);
  function writeWeather() {
    if (weather === null) {
      return;
    }
    const weatherIcon = document.getElementById("weather-icon");
    const weatherTemperature = document.getElementById("weather-temperature");
    const weatherTemperatureDifference = document.getElementById(
      "weather-temperature-difference"
    );
    const weatherDescription = document.getElementById("weather-description");

    weatherIcon.innerHTML = weather.weather[0].icon; // 天気アイコン image/weather_icon/ から取得
    weatherTemperature.innerHTML = weather.main.temp + "℃";
    weatherTemperatureDifference.innerHTML =
      weather.main.temp - weather.main.temp_min + "℃";  // 前日との気温差(どこかに前日の気温を保存しておく必要がある)
    weatherDescription.innerHTML = weather.weather[0].description;
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
      { writeWeather() }
      <div id="weather">
        <div id="weather-icon">
          <img src="" alt="weather-icon"/>
        </div>
        <div id="weather-temperature">-℃</div>

        {/* 前日との気温差 */}
        <div id="weather-temperature-difference">-℃</div>

        <div id="weather-description">天気情報を取得できていない可能性があります。</div>
      </div>
    </div>
  );
}

export default Weather;
