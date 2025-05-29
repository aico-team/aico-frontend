import React, { useEffect } from "react";
import useCurriculumStore from "../../stores/curriculumStore";
import ProgressCircle from "../components/common/ProgressCircle";
import "../styles/CurriculumList.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const CurriculumList = () => {
  //여러 개의 커리큘럼 객체가 들어있는 배열 curriculum
  const {
    curriculums,
    fetchCurriculumList,
    deleteCurriculum,
    isLoading,
    toggleCompleteStep,
    progressMap,
    recommendations,
    fetchRecommendations,
    expandedSteps,
    toggleExpandedStep,
    loadingSteps,
  } = useCurriculumStore();

  useEffect(() => {
    fetchCurriculumList();
  }, [fetchCurriculumList]);

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
          {curriculums.map((curri) => {
            const percent = progressMap[curri.id] || 0;

            return (
              <div className="curriculum-card" key={curri.id}>
                <div className="curriculum-header">
                  <div className="topic-progress-wrap">
                    <h2 className="curriculum-topic">📘 {curri.topic}</h2>
                    <ProgressCircle value={percent} />
                  </div>
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
                    .map(([step, detail]) => {
                      const key = `${curri.id}-${step}`;
                      const isExpanded = expandedSteps.has(key);
                      const isLoading = loadingSteps.has(key);
                      const recs = recommendations[key] || [];

                      return (
                        <div key={step}>
                          <div
                            className={`step-item ${detail.completed ? "completed" : ""}`}
                          >
                            <input
                              type="checkbox"
                              checked={detail.completed}
                              onChange={() =>
                                toggleCompleteStep(
                                  curri.id,
                                  step,
                                  !detail.completed
                                )
                              }
                            />
                            <strong>Step {step}:</strong> {detail.description}
                            <button
                              className="toggle-recommend-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (expandedSteps.has(key)) {
                                  toggleExpandedStep(key);
                                } else {
                                  fetchRecommendations(curri.id, step);
                                }
                              }}
                            >
                              {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                            </button>
                          </div>

                          {isExpanded && (
                            <div className="recommendation-list">
                              {isLoading ? (
                                <p>자료 불러오는 중...</p>
                              ) : (
                                recs.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="recommendation-item"
                                  >
                                    <a
                                      href={item.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {item.title}
                                    </a>
                                  </div>
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CurriculumList;
