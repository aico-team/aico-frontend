import React, { useState } from "react";
import apiClient from "../lib/apiClient";

const GeneratedCurriculum = ({ curriculum, topic }) => {
  // if (!curriculum) {
  //   return <p>커리큘럼 데이터가 없습니다. 다시 시도해주세요.</p>;
  // }

  const descriptions = curriculum
    ? Object.entries(curriculum)
        .map(([step, info]) => `${step}. ${info.description}`)
        .join("\n")
    : "";

  const [content, setContent] = useState(descriptions);
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState();

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await apiClient.post("/curri/confirm", {
        topic: topic,
        content: content,
      });
      console.log("서버 응답:", response.data);
    } catch (err) {
      setError("커리큘럼 확인 실패:", err);
    }
  };

  return (
    <div>
      <h1>이 커리큘럼 어때요?☺️</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        readOnly={!isEditable}
        rows={10}
        style={{ width: "80%", marginTop: "20px" }}
      />
      <div>
        <button onClick={handleEdit}>수정</button>
        <button onClick={handleConfirm}>확인</button>
      </div>
    </div>
  );
};

export default GeneratedCurriculum;
