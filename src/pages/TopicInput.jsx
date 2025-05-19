import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../lib/apiClient";

const TopicInput = ({ setCurriculum, setTopic }) => {
  const [input, setInput] = useState({
    topic: "",
    stage: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.topic.trim()) {
      setError("토픽을 입력해주세요.");
      return;
    }

    if (!input.stage.trim()) {
      setError("단계 수를 입력해주세요.");
      return;
    }

    try {
      const response = await apiClient.get(
        `/curri?topic=${encodeURIComponent(input.topic)}&stage=${input.stage}`
      );
      console.log("받은 데이터:", response.data);

      //커리큘럼 데이터를 저장
      setCurriculum(response.data);
      setTopic(input.topic);

      //토픽 입력 후 커리큘럼 생성 페이지로 이동
      navigate("/GeneratedCurriculum");
    } catch (err) {
      setError("커리큘럼 생성에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1> Q. 공부하고 싶은 토픽이 무엇인가요?</h1>
        <div>
          <input
            type="text"
            id="topic"
            name="topic"
            value={input.topic}
            onChange={onChange}
            placeholder="토픽을 입력해주세요"
            required
          />
          <input
            type="number"
            id="stage"
            name="stage"
            value={input.stage}
            onChange={onChange}
            placeholder="단계 수 (3~6)"
            min="3"
            max="6"
            required
          />
          <button type="submit">확인</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <h6>
          원하는 분야, 기술 등을 키워드로 입력하면 AI가 입력 정보를 기반으로
          커리큘럼을 추천해 드려요.
        </h6>
      </form>
    </div>
  );
};

export default TopicInput;
