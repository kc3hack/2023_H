import React from 'react';
import './index.css';
import './Schedule.css';
import reportWebVitals from './reportWebVitals';
import Running from './img/Running.png'
import Background1 from './img/BG1.png'
import Event0 from './img/EV1.png'
import Event1 from './img/EV2.png'
import Event2 from './img/EV3.png'
import Event3 from './img/EV4.png'
import BackgroundInfo from './img/BG_info.png'

reportWebVitals();

//UNIX時間を文字列にする関数(開始時刻～終了時刻)
function formatDateTimeRange(startTimestamp, endTimestamp, onlyDate = false) {
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const start = new Date(startTimestamp);
  const end = new Date(endTimestamp);
  const startDateString = `${start.getMonth() + 1}月${start.getDate()}日`;
  const startTimeString = `${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')}`;
  const endTimeString = `${end.getHours()}:${end.getMinutes().toString().padStart(2, '0')}`;
  if (startDateString === `${end.getMonth() + 1}月${end.getDate()}日`) {
    if (onlyDate) {
      return `${startDateString}(${weekdays[start.getDay()]})`;
    } else {
      return `${startDateString}(${weekdays[start.getDay()]})${startTimeString}~${endTimeString}`;
    }
  } else {
    const startString = `${startDateString}(${weekdays[start.getDay()]})${startTimeString}`;
    const endString = `${end.getMonth() + 1}月${end.getDate()}日(${weekdays[end.getDay()]})${endTimeString}`;
    if (onlyDate) {
      return `${startDateString}(${weekdays[start.getDay()]})~${endString}`;
    } else {
      return `${startString}~${endString}`;
    }
  }
  //開始時刻(UNIX時間)までの時間を文字列にする関数
}
function getTimeRemaining(timestamp) {
  const now = Date.now();
  const timeRemaining = timestamp - now;
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);

  return (days ? `あと${days}日${hours}時間` : `あと${hours}時間${minutes}分`);
}

//ボタン(クリックしたら詳細情報が出る)
function Icon({ simpevents, eventID }) {
  const Event = [Event0, Event1, Event2, Event3];
  const [showDetails, setShowDetails] = React.useState(false);
  function handleIconClick() {
    setShowDetails(true);
  }
  function handleDetailsClose() {
    setShowDetails(false);
  }

  return (
    <span className="icon-container">

      <button className={"button" + eventID} onClick={handleIconClick}>
        <img src={Event[eventID]} alt="Event" className={"event" + eventID} />
        {simpevents.summary}
      </button>
      {showDetails && (
        <span className="details-container">
          <img src={BackgroundInfo} alt="BackgroundInfo" className={"BackgroundInfo"} />
          <button onClick={handleDetailsClose} className={"backbutton"}>{"＜"}</button>
          <span >{"🗓️" + formatDateTimeRange(simpevents.start, simpevents.end, simpevents.allday)}</span>
          <p className={"remaintime"}>{"⏱️" + getTimeRemaining(simpevents.start)}</p>
          <h2>{simpevents.summary}</h2>
          <h3>{simpevents.description}</h3>
          <h4>{(simpevents.location && "📍") + simpevents.location.split(",")[0]}</h4>
        </span>
      )}
    </span>
  );
}
//最初の4つのイベントをまとめる
function EventButtons(props) {
  return (
    <span className="event-container">
      {props.simpevents.slice(0, 4).map((simpevents, i) => (
        <Icon
          key={i}
          simpevents={simpevents}
          eventID={i}
        />
      ))}
    </span>
  );
}

class Schedule extends React.Component {
  //簡単化した情報をstateに保存
  constructor(props) {
    super(props);
    this.state = {
      simpevents: []
    };
  }
  //グーグルカレンダーから読み取って処理する
  componentDidMount() {
    fetch(`https://www.googleapis.com/calendar/v3/calendars/${this.props.calendarID}/events?timeMin=2023-02-11T00:00:00Z&key=${this.props.APIkey}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        var simpevents = data.items.map(({ summary, description, start, end, location }) =>
        ({
          summary,
          description: (description || ''),
          start: Date.parse((start.dateTime || start.date).slice(0, 19)),
          end: Date.parse((end.dateTime || end.date).slice(0, 19)) - (end.date ? 24 * 60 * 60 * 1000 : 0),
          location: (location || ''),
          allday: (end.date ? true : false)
        }));
        simpevents.sort((a, b) => a.start - b.start);
        simpevents = simpevents.filter(events => events.end > Date.now());
        this.setState({ simpevents: simpevents });
      })
      .catch(error => console.error(error));
  }

  render() {
    console.log(this.state.simpevents);
    return (
      <>
        <div className="container" style={{ position: "relative" }}>
          <img src={Background1} alt="Background1" className="background" />
          <img src={Running} alt="Running" className="Running" />
          <EventButtons simpevents={this.state.simpevents} />
        </div>
      </>
    );
  }
}
export default Schedule; 