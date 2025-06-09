import React, { useEffect, useRef } from "react";
import useCurriculumStore from "../../stores/curriculumStore";
import ProgressCircle from "../components/common/ProgressCircle";
import "../styles/CurriculumList.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  const highlightId = location.state?.highlightId;
  const cardRefs = useRef({});

  useEffect(() => {
    fetchCurriculumList();
  }, [fetchCurriculumList]);

  useEffect(() => {
    if (highlightId && cardRefs.current[highlightId]) {
      cardRefs.current[highlightId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [curriculums, highlightId]);

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
              <div
                ref={(el) => (cardRefs.current[curri.id] = el)}
                className={`curriculum-card ${curri.id === highlightId ? "highlight" : ""}`}
                key={curri.id}
              >
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
                            <strong> Step {step}:</strong> {detail.description}
                            <button
                              className="toggle-recommend-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                const alreadyExpanded = expandedSteps.has(key);

                                if (alreadyExpanded) {
                                  toggleExpandedStep(key);
                                } else {
                                  toggleExpandedStep(key);
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
                              ) : Array.isArray(recs) && recs.length > 0 ? (
                                (() => {
                                  // 1. 모든 title 문자열 병합
                                  const rawText = recs
                                    .map((item) => item.title)
                                    .join(" ");

                                  // 2. 마크다운 [텍스트](링크) 추출
                                  const markdownMatches = [
                                    ...rawText.matchAll(
                                      /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g
                                    ),
                                  ];

                                  // 3. [텍스트] - 링크 형식도 추출
                                  const legacyMatches = [
                                    ...rawText.matchAll(
                                      /\[([^\]]+)\]\s*-\s*(https?:\/\/\S+)/g
                                    ),
                                  ];

                                  // 4. 일반 텍스트 항목 추출 (링크가 없는 경우)
                                  const others = recs
                                    .map((item) => item.title)
                                    .filter(
                                      (t) =>
                                        !t.match(/\[.*\]\((https?:\/\/)/) &&
                                        !t.match(/\[.*\] - https?:\/\//)
                                    );

                                  // 5. 결과 합치기 (마크다운 + 구문 + 일반 텍스트)
                                  const finalItems = [
                                    ...markdownMatches.map((m) => ({
                                      title: m[1],
                                      url: m[2],
                                    })),
                                    ...legacyMatches.map((m) => ({
                                      title: m[1],
                                      url: m[2],
                                    })),
                                    ...others.map((t) => ({ title: t })),
                                  ].slice(0, 3); // 최대 3개까지만

                                  // 6. 렌더링
                                  return finalItems.map((item, idx) => (
                                    <div
                                      key={idx}
                                      className="recommendation-item"
                                    >
                                      <span>{idx + 1}. </span>
                                      {item.url ? (
                                        <a
                                          href={item.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="recommendation-link"
                                        >
                                          {item.title}
                                        </a>
                                      ) : (
                                        <span className="recommendation-title-link">
                                          {item.title}
                                        </span>
                                      )}
                                    </div>
                                  ));
                                })()
                              ) : (
                                <p>자료가 존재하지 않습니다.</p>
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
