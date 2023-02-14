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
    </div>
  );
}

export default Weather;
