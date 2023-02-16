import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { useNavigate } from "react-router-dom";


reportWebVitals();


  function Setting(){
    const navigate = useNavigate();
    
    return(
        <>
        <div>
          設定画面
        </div>

        <button className="setting-weather" onClick={() => {navigate('/weather')}}>
          天気設定
        </button>

        <button className="setting-traffic" onClick={() => {navigate('/traffic')}}>
          交通設定
        </button>

        <button className="setting-schedule" onClick={() => {navigate('/schedule')}}>
          予定設定
        </button>
        </>
      )
  
}

  export default Setting; 