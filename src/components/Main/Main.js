import React, { useState, useEffect } from "react";
import "./Main.css";
import chocho from "./chocho.jpg";

const Main = () => {
  const [time, setTime] = useState(new Date());
  // 현재 시간을 저장하는 상태 변수 time과 이를 업데이트하는 함수 setTime을 useState훅을 사용하여 정의
  // 초기 값으로 현재 시간을 new Date() 객체로 설정

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    // useEffect 훅을 사용해 컴포넌트가 마운트 되었을 때, 매초마다(setInterval) 현재 시간을 업데이트하는 타이머를 설정

    return () => clearInterval(timer); // 컴포넌트가 언마운트 될 때, 타이머를 정리하기 위해 clearInterval(timer)을 호출
  }, []); // 빈배열([])을 두 번째 인자로 주어, 컴포넌트가 처음 마운트 될 때만 이 효과가 실행되도록 설정

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  }; // 시간 데이터를 포맷팅해 사용자에게 보기 좋은 형태의 시간 문자열로 반환하는 함수 formatTime을 정의합니다.

  return (
    <div className="Main">
      <div className="image-container">
        <img src={chocho} className="mainCho" />
      </div>
      <div className="clock-container">
        <p className="clock">{formatTime(time)}</p>
      </div>
      {/* formatTime 함수를 사용해서 time 상태를 시계 형식의 문자열로 변환해 화면에 출력 */}
    </div>
  );
};

export default Main;
