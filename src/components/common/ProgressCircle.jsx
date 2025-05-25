import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../styles/ProgressCircle.css";

const ProgressCircle = ({ value }) => {
  return (
    <div className="progress-circle-container">
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6ED3C7" />
            <stop offset="100%" stopColor="#66BC22" />
          </linearGradient>
        </defs>
      </svg>
      <div className="cicle-wrapper">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            pathColor: "url(#gradient)",
            rotation: 0,
            textColor: "#333",
            textSize: "24px",
          })}
        />
      </div>
    </div>
  );
};

export default ProgressCircle;
