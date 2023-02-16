import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ApiCalendar from "react-google-calendar-api";


reportWebVitals();

const config = require('./creds.json');

const apiCalendar = new ApiCalendar(config)

function Schedule() {
  // GoogleCalendarのイベントを取得する
  const getEvents = () => {
    apiCalendar.listUpcomingEvents(10)
      .then(({ result }) => {
        //イベントを表示するdiv
        const events = document.getElementById('events');

        //divを初期化しておく
        events.innerHTML = '';

        //イベントを表示する
        result.items.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = item.summary + ' - ' + item.start.dateTime;
          events.appendChild(li);
        });

        //次のイベントまでの時間を表示する
        minutesToNextEvent();
      });
  };

  // 次のイベントまでの時間を取得する
  const minutesToNextEvent = () => {
    apiCalendar.listUpcomingEvents(1)
      .then(({ result }) => {
        const event = result.items[0];
        const now = new Date();
        const eventTime = new Date(event.start.dateTime);
        const diff = eventTime - now;
        const minutes = Math.round(diff / 1000 / 60);

        //時間を表示するdiv
        const minutesDiv = document.getElementById('minutes');

        //最初に初期化しておく
        minutesDiv.innerHTML = '';

        //表示
       
        minutesDiv.innerHTML = '<h2> 次のイベントまで' + minutes + ' 分です！ ( ' + event.summary + ' ) </h2>';
      });
  };

  // GoogleCalendarにログインする
  const handleSignInClick = () => {
    apiCalendar.handleAuthClick();
  }

  // GoogleCalendarからログアウトする
  const handleSignOutClick = () => {
    apiCalendar.handleSignoutClick();
  }

  // 時計を表示する
  const clock = () => {
    const time = new Date().toLocaleTimeString();
    document.getElementById("clock").innerHTML = time;
  }

  setInterval(clock, 1000);

  return (
    <div className="App">
      <h1>現在の時刻</h1>
      <div id="clock"></div>
      <h1>次の予定</h1>
      <button onClick={handleSignInClick}>ログイン</button>
      <button onClick={handleSignOutClick}>ログアウト</button>

      {/* TODO: 自動的にイベントを取得するようにする */}
      <button onClick={getEvents}>イベント取得</button>

      <div id="minutes"></div>
      <div id="events"></div>
    </div>
  );
}

  export default Schedule; 