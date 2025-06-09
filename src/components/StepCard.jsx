import React from "react";
import "../styles/GeneratedCurriculum.css";

const StepCard = ({ step, content }) => {
  return (
    <div className="step-card">
      <h4>{step}단계</h4>
      <p>{content}</p>
    </div>
  );
};

export default StepCard;
