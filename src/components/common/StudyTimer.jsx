import React from "react";
import useStudyTimeStore from "../../../stores/studyTimeStore";

const StudyTimer = () => {
  const { isRunning, startTimer, stopTimer, formattedTime } =
    useStudyTimeStore();
  return (
    <div>
      <h2>{formattedTime()}</h2>
      <button onClick={startTimer}>시작</button>
      <button onClick={stopTimer}>정지</button>
    </div>
  );
};

export default StudyTimer;
