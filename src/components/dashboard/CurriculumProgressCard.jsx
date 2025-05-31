import React, { useEffect } from "react";
import useCurriculumStore from "../../../stores/curriculumStore";
import ProgressCircle from "../common/ProgressCircle";
import { useNavigate } from "react-router-dom";
import "../../styles/CurriculumProgressCard.css";

const CurriculumProgressCard = () => {
  const { curriculums, progressMap, fetchCurriculumList } =
    useCurriculumStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurriculumList();
  }, []);

  const topCurris = curriculums;
  const bgColors = ["#F0F7FF", "#FFF0F7", "#F0FFF3", "#FFF5F0"];
  const nmColors = [
    "rgba(0, 119, 255, 0.5)",
    "rgba(255, 29, 134, 0.5)",
    "rgba(22, 208, 59, 0.5)",
    "rgba(255, 126, 62, 0.5)",
  ];

  return (
    <div className="curriculum-progress-wrapper">
      <h2 className="progress-title">📚 진행 중인 커리큘럼</h2>
      {topCurris.length === 0 ? (
        <p>커리큘럼이 없습니다.</p>
      ) : (
        <div className="curriculum-progress-list">
          {topCurris.map((curri, idx) => {
            const percent = progressMap[curri.id] ?? 0;
            return (
              <div
                className="curriculum-progress-item"
                key={curri.id}
                style={{
                  backgroundColor: bgColors[idx % bgColors.length],
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate("/CurriculumList", {
                    state: { highlightId: curri.id },
                  })
                }
              >
                <div className="curriculum-card-left">
                  <div
                    className="curriculum-number"
                    style={{ backgroundColor: nmColors[idx % nmColors.length] }}
                  >
                    {idx + 1}
                  </div>
                  <div className="curriculum-topic-name">{curri.topic}</div>
                </div>
                <div className="curriculum-card-right">
                  <ProgressCircle value={percent} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CurriculumProgressCard;
