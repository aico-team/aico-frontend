import React, { useState } from "react";
import apiClient from "../lib/apiClient";
import "../styles/ChatBox.css";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (!input.trim()) {
      setError("질문을 입력해주세요.");
      return;
    }

    //메시지 상태에 불러온 메시지 저장
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput(""); //입력창 초기화
    setError(null);
    setLoading(true);

    try {
      const response = await apiClient.post("/chat", { message: input });
      console.log("서버 응답:", response.data);

      //응답 불러오기
      setMessages((prev) => [...prev, { role: "bot", text: response.data }]);
    } catch (err) {
      setError("질문 불러오기 실패:" + err.message);
      console.log(err);
    } finally {
      setLoading(false); //로딩 종료
    }
  };

  return (
    <div className="chatbox-wrapper">
      <div className="chatbox-messages">
        {messages.map((msg, idx) => (
          <div className={`message-wrapper ${msg.role}`} key={idx}>
            <div className="message-role">
              {msg.role === "user" ? "🧑 사용자" : "🧠 봇"}
            </div>
            <div className={`message-box ${msg.role}`}>{msg.text}</div>
          </div>
        ))}
        {loading && <p>🧠답변 생성 중입니다...</p>}
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="chatbox-input">
        <input
          type="text"
          value={input}
          onChange={onChange}
          placeholder="질문을 입력해주세요!"
          required
        />
        <button type="submit" onClick={handleSend}>
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
