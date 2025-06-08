import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/DashboardQuizCard.css";

const DashboardQuizCard = ({ quiz, answer, index }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate("/WrongNotePage");
  }, [navigate]);

  return (
    <div className="dashboard-quiz-card">
      <p className="dashboard-quiz-num">Quiz {index}</p>
      <p
        className="dashboard-quiz-question link"
        onClick={handleNavigate}
        style={{ cursor: "pointer" }}
      >
        {quiz}
      </p>

      <div className="toggle-bttn-wrapper">
        <button
          className="dashboard-toggle-answer-bttn"
          onClick={() => setShowAnswer((prev) => !prev)}
        >
          {showAnswer ? "정답 숨기기" : "정답 보기"}
        </button>
      </div>
      {showAnswer && <p className="dashboard-quiz-answer">{answer}</p>}
    </div>
  );
};

export default DashboardQuizCard;
