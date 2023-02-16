import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Top from './Top';
import Setting from './Setting';
import Weather from './Weather';
import Traffic from './Traffic';
import Time from './Time';
import Schedule from './Schedule';





function App () {


  /* ルーティング */
    return(
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Top />} />
          <Route exact path="/setting" element={<Setting />} />
          <Route  path="/weather" element={<Weather />} />
          <Route  path="/traffic" element={<Traffic />} />
          <Route  path="/time" element={<Time />} />
          <Route  path="/schedule" element={<Schedule />} />
        </Routes>
      </BrowserRouter>
    );
  
}
 
export default App;

