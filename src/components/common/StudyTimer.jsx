import React, { useEffect } from "react";
import useStudyTimeStore from "../../../stores/studyTimeStore";

const StudyTimer = () => {
  const { isRunning, startTimer, stopTimer, formattedTime, loadFromStorage } =
    useStudyTimeStore();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <div>
      <h2>{formattedTime()}</h2>
      <button onClick={startTimer}>시작</button>
      <button onClick={stopTimer}>정지</button>
    </div>
  );
};

export default StudyTimer;
