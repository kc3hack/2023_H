import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Top from './Top';
import Weather from './Weather';
import Traffic from './Traffic';
import Time from './Time';
import ScheduleTime from './ScheduleTime';
import Schedule from './Schedule';

const calendarID = '282696404qq@gmail.com';
const APIkey = 'AIzaSyB211YGz4rfmjrJIcf_9r036GvUsVqegtM';


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
          <Route  path="/schedule" element={<Schedule calendarID={calendarID} APIkey={APIkey} />} />
        </Routes>
      </BrowserRouter>
    );
  
}

export default App;

