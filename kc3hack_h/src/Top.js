import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Weather from './Weather';


reportWebVitals();


function Top(){
    
      return(
          <>
          <div>
            トップ画面
            <Weather/>
          </div>
          </>
        )
    
  }

  export default Top; 