import React , { useState, useEffect } from "react";
import "./Main.css";

import chocho from "./chocho.jpg";

const Main = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };
  return (
    <div className="Main">
      <div className="image-container">
        <img src={chocho} className="mainCho" />
      </div>
      <div className="clock-container">
        <p className="clock">{formatTime(time)}</p>
      </div>
    </div>
  );
};

export default Main;
