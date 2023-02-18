import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Top from './Top';
import Weather from './Weather';
import Traffic from './Traffic';
import Time from './Time';
import ScheduleTime from './ScheduleTime';
import Schedule from './Schedule';




function App() {


  /* ルーティング */
    return(
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Top />} />
          <Route  path="/weather" element={<Weather />} />
          <Route  path="/traffic" element={<Traffic />} />
          <Route  path="/time" element={<Time />} />
          <Route  path="/scheduletime" element={<ScheduleTime />} />
          <Route  path="/schedule" element={<Schedule />} />
        </Routes>
      </BrowserRouter>
    );
  
}

export default App;

