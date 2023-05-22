import "../../style/header.css";
import { getTodayFullDateTime } from "../../function/getFullDateToday";
import { useEffect, useState } from "react";

function DatePan() {
  const [today, setToday] = useState(getTodayFullDateTime());
  let date = today.date;
  let time = today.time;
  

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(getTodayFullDateTime())
    }, 1000 * 30 );
    return () => clearInterval(interval);
  }, [])
  return (
    <div>
      <div style={{ display: "flex", width: "40%", minWidth: "300px" }}>
        <div className="header-icon"></div>
        <div style={{ marginLeft: "15px" }}>
          <div className="real-date">{date}</div>
          <div style={{ color: "white", fontSize: "12px" }}>Date</div>
        </div>
        <div style={{ marginLeft: "25px" }}>
          <div className="real-date">45</div>
          <div style={{ color: "white", fontSize: "12px" }}>Week</div>
        </div>
        <div style={{ marginLeft: "25px" }}>
          <div className="real-date">{time}</div>
          <div style={{ color: "white", fontSize: "12px" }}>Time</div>
        </div>
      </div>
    </div>
  );
}

export default DatePan;
