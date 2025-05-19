import React, { useEffect } from "react";
import useCurriculumStore from "../../stores/curriculumStore";
import "../styles/CurriculumList.css";

const CurriculumList = () => {
  //여러 개의 커리큘럼 객체가 들어있는 배열 curriculum
  const { curriculums, fetchCurriculumList, deleteCurriculum, isLoading } =
    useCurriculumStore();

  useEffect(() => {
    fetchCurriculumList();
  }, []);

  if (isLoading) {
    return <p className="empty-message">불러오는 중입니다...</p>;
  }

  return (
    <div className="curriculum-list-container">
      <h1 className="curriculum-title">📚 커리큘럼 목록</h1>
      {curriculums.length === 0 ? (
        <p className="empty-message">아직 저장된 커리큘럼이 없습니다.</p>
      ) : (
        <div className="curriculum-scroll">
          {curriculums.map((curri) => (
            <div className="curriculum-card" key={curri.id}>
              <div className="curriculum-header">
                <h2 className="curriculum-topic">📘 {curri.topic}</h2>
                <button
                  className="delete-button"
                  onClick={() => {
                    if (window.confirm("정말 삭제하시겠습니까?")) {
                      deleteCurriculum(curri.id);
                    }
                  }}
                >
                  삭제
                </button>
              </div>
              <div className="step-list">
                {Object.entries(curri.curriculumMap)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([step, detail]) => (
                    <div
                      key={step}
                      className={`step-item ${detail.completed ? "completed" : ""}`}
                    >
                      <strong>Step {step}:</strong> {detail.description}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurriculumList;
