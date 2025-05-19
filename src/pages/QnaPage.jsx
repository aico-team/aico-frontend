import React from "react";
import ChatBox from "../components/ChatBox";

const QnaPage = () => {
  return (
    <div>
      <div className="qna-wrapper">
        <h1 className="qna-title">💬 챗봇과의 대화</h1>
        <ChatBox />
      </div>
    </div>
  );
};

export default QnaPage;
