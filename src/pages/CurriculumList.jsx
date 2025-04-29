import React, { useEffect } from "react";
import useCurriculumStore from "../../stores/curriculumStore";

const CurriculumList = () => {
  //여러 개의 커리큘럼 객체가 들어있는 배열 curriculum
  const { curriculums, fetchCurriculumList, deleteCurriculum } =
    useCurriculumStore();

  useEffect(() => {
    fetchCurriculumList();
  }, []);

  return (
    <div>
      <h1>커리큘럼 목록</h1>
      {curriculums.length === 0 ? (
        <p>아직 저장된 커리큘럼이 없습니다.</p>
      ) : (
        curriculums.map((curri) => (
          <div key={curri.id} style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>📘 {curri.topic}</h2>
              <button
                onClick={() => {
                  if (window.confirm("정말 삭제하시겠습니까?")) {
                    deleteCurriculum(curri.id);
                  }
                }} //임시로 버튼 스타일 적용. 후에 css 파일로 옮길 것
                style={{
                  background: "#6ED3C7",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  height: "100%",
                  textAlign: "center",
                }}
              >
                삭제
              </button>
            </div>
            {Object.entries(curri.curriculumMap).map(([step, detail]) => (
              <div
                key={step}
                style={{
                  paddingLeft: "10px",
                  //완료된 경우 회색 글씨로
                  color: detail.completed ? "gray" : "black",
                }}
              >
                <strong>Step {step}:</strong> {detail.description}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default CurriculumList;
