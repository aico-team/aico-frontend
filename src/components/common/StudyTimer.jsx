import React, { useEffect } from "react";
import useStudyTimeStore from "../../../stores/studyTimeStore";

const StudyTimer = () => {
  const { startTimer, stopTimer, formattedTime, loadFromStorage } =
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
    <div>
      <h2>{formattedTime()}</h2>
      <button onClick={startTimer}>시작</button>
      <button onClick={stopTimer}>정지</button>
    </div>
  );
};

export default StudyTimer;
