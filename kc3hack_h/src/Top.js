import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Weather from './Weather';
import { useNavigate } from "react-router-dom";


reportWebVitals();


function Top(){
  const navigate = useNavigate()
    
      return(
          <>
          <div>
            トップ画面
            <Weather/>
            <button onClick={() => {navigate('/traffic')
      }}>遅延情報</button>
          </div>
          </>
        )
    
  }

  export default Top; 