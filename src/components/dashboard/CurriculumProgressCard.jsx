import React, { useEffect } from "react";
import useCurriculumStore from "../../../stores/curriculumStore";
import ProgressCircle from "../common/ProgressCircle";
import "../../styles/CurriculumProgressCard.css";

const CurriculumProgressCard = () => {
  const { curriculums, progressMap, fetchCurriculumList } =
    useCurriculumStore();

  useEffect(() => {
    fetchCurriculumList();
  }, []);

  return (
    <div>
      {curriculums.length === 0 ? (
        <p>커리큘럼이 없습니다.</p>
      ) : (
        <div className="curriculum-progress-list">
          {curriculums.map((curri) => {
            const percent = progressMap[curri.id] ?? 0;
            return (
              <div className="curriculum-progress-item" key={curri.id}>
                <span className="topic">{curri.topic}</span>
                <ProgressCircle value={percent} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CurriculumProgressCard;
