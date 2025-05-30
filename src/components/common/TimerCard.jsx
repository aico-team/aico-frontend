import React from "react";
import "../../styles/TimerCard.css";

const TimerCard = ({ time, isRunning, onStart, onStop }) => {
  return (
    <div className="timer-card">
      <p className="timer-label">
        {isRunning ? "⏳ 공부 중입니다!" : "⏸ 빨리 시작해요!"}
      </p>
      <h2 className="timer-time">{time}</h2>
      <div className="timer-buttons">
        <button onClick={onStart} disabled={isRunning}>
          ▶ 시작
        </button>
        <button onClick={onStop} disabled={!isRunning}>
          ⏹ 정지
        </button>
      </div>
    </div>
  );
};

export default TimerCard;
