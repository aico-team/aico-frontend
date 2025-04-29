import React, { useEffect, useState } from "react";
import apiClient from "../lib/apiClient";
import { useNavigate } from "react-router-dom";

const GeneratedCurriculum = ({ curriculum, topic }) => {
  // if (!curriculum) {
  //   return <p>커리큘럼 데이터가 없습니다. 다시 시도해주세요.</p>;
  // }

  const [originalContent, setOriginalContent] = useState(""); //받아온 원본 curriculum
  const [content, setContent] = useState(""); //사용자가 수정할 수 있는 텍스트
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  //사용자가 curriculum 수정시 개행문자 여부 확인
  useEffect(() => {
    if (curriculum) {
      if (curriculum.includes("\n")) {
        //이미 줄바꿈이 있는 경우
        setOriginalContent(curriculum);
        setContent(curriculum);
      } else {
        //줄바꿈이 없는 경우 숫자단위로 개행 삽입
        const fixed = curriculum
          .replace(/(\d+):/g, (match, p1, offset) =>
            offset === 0 ? `${p1}:` : `\n${p1}:`
          )
          .trim();
        setOriginalContent(fixed);
        setContent(fixed);
      }
    }
  }, [curriculum]);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleConfirm = async () => {
    try {
      // 수정 여부 상관 없이 content를 정리
      const cleanedContent = content
        .split("\n")
        .filter((line) => line.trim().length > 0) //빈줄 제거
        .join("\n");

      const payload = {
        topic: topic,
        content: cleanedContent,
      };

      const response = await apiClient.post("/curri/confirm", payload);
      console.log("서버 응답:", response.data);

      navigate("/CurriculumList");
    } catch (err) {
      setError("커리큘럼 확인 실패:" + err.message);
      console.log(err);
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GeneratedCurriculum;
