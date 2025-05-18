import React, { useState } from "react";
import apiClient from "../lib/apiClient";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async (e) => {
    if (!input.trim()) {
      setError("질문을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.post("/chat", { message: input });
      console.log("서버 응답:", response.data);

      //메시지 상태에 불러온 메시지 저장
      setMessages((prev) => [
        ...prev,
        { role: "user", text: input },
        { role: "bot", text: response.data },
      ]);

      setInput(""); //입력창 초기화
      setError(null);
    } catch (err) {
      setError("질문 불러오기 실패:" + err.message);
      console.log(err);
    } finally {
      setLoading(false); //로딩 종료
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, idx) => (
          <div className="message-box" key={idx}>
            <strong>{msg.role === "user" ? "🧑 사용자" : "🧠 봇"}</strong>
            <div>{msg.text}</div>
          </div>
        ))}
        <div>
          {loading && <p>🧠답변 생성 중입니다...</p>}
          <div>
            <input
              type="text"
              value={input}
              onChange={onChange}
              placeholder="질문을 입력해주세요"
              required
            />
            <button type="submit" onClick={handleSend}>
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
