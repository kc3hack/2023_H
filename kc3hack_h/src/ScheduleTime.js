import React from 'react';
import reportWebVitals from './reportWebVitals';
import ApiCalendar from "react-google-calendar-api";
import './scheduletime.css';


reportWebVitals();

const config = require('./creds.json');

const apiCalendar = new ApiCalendar(config)

//UNIX時間を文字列にする関数(開始時刻)
function formatDateTimeRange(startTimestamp) {
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const start = new Date(startTimestamp);
  const startDateString = `${start.getMonth() + 1}月${start.getDate()}日`;
  const startTimeString = `${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')}`;

  const startString = `${startDateString}(${weekdays[start.getDay()]})${startTimeString}`;
  return startString;
}


function ScheduleTime() {
  apiCalendar.setCalendar('4470745b8d461bcb00fed6432eadecad24ec6f69fd2107eda8ef98a05af13da2@group.calendar.google.com');

  // GoogleCalendarのイベントを取得する
  const getEvents = () => {
    apiCalendar.listUpcomingEvents(3)
      .then(({ result }) => {
        //イベントを表示するdiv
        const events = document.getElementById('events');

        //divを初期化しておく
        events.innerHTML = '';

        //イベントを表示する
        result.items.forEach(item => {
          //開始時刻をUNIX時間にする
          const start = new Date(item.start.dateTime).getTime();
          //自然表示にする
          const startString = formatDateTimeRange(start);
          const li = document.createElement('li');
          li.innerHTML = '<b>' + item.summary + '</b> <br /> (' + startString + ')';
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
       
        minutesDiv.innerHTML = minutes;
      });
  };

  // // GoogleCalendarにログインする
  // const handleSignInClick = () => {
  //   apiCalendar.handleAuthClick();
  // }

  // // GoogleCalendarからログアウトする
  // const handleSignOutClick = () => {
  //   apiCalendar.handleSignoutClick();
  // }

  // 時計を表示する
  const clock = () => {
    const time = new Date().toLocaleTimeString();
    document.getElementById("clock").innerHTML = time;
  }

  setInterval(clock, 1000);

  return (
    // one seconds later, get events
    setTimeout(getEvents, 2000),
    <div className="App">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body m-2">
          <div id="clock" className="text-6xl p-3"></div>
          <div className="grid grid-cols-6 md:grid-cols-11">
            {/* show next event */}
            <div className="col-span-7 md:col-span-4 bg-yellow-200 rounded-lg p-4 md:p-4 md:mr-2 mb-2">
              <div className="text-2xl">あと</div>
              <div id="minutes" className="text-6xl"></div>
              <div className="text-2xl">分</div>
            </div>
            {/* show events */}
            <div className="col-span-7 bg-blue-100 rounded-lg p-3 mb-2">
              <div id="events" onEnded={getEvents}></div>
            </div>
          </div>
        </div>
      </div>
      {/* <button className="btn mr-2 mt-2" onClick={handleSignInClick}>ログイン</button>
      <button className="btn mr-2" onClick={handleSignOutClick}>ログアウト</button>
      <button className="btn" onClick={getEvents}>イベント取得</button> */}
    </div>
  );
}

  export default ScheduleTime; 