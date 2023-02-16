import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { useNavigate } from "react-router-dom";



reportWebVitals();


function Top(){
  const navigate = useNavigate();
    
      return(
          <>
          <div>
            トップ画面
          </div>

          <button className="setting"
              onClick={() => {navigate('/setting')
          }}>
            設定
          </button>
          </>
        )
    
  }



  export default Top; 