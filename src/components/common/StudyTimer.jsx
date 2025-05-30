import React, { useEffect } from "react";
import useStudyTimeStore from "../../../stores/studyTimeStore";
import TimerCard from "./TimerCard";

const StudyTimer = () => {
  const { isRunning, startTimer, stopTimer, formattedTime, loadFromStorage } =
    useStudyTimeStore();

  useEffect(() => {
    loadFromStorage();

    //사용자가 현재 페이지를 닫거나 새로고침하려고 할 때 타이머 정지
    const handleUnload = () => {
      stopTimer(); //서버 sync 및 상태 저장
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [loadFromStorage, stopTimer]);

  return (
    <TimerCard
      time={formattedTime()}
      isRunning={isRunning}
      onStart={startTimer}
      onStop={stopTimer}
    />
  );
};

export default StudyTimer;
