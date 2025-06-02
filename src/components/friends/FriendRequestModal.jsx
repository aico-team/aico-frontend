import React, { useState } from "react";
import useFriendStore from "../../../stores/friendStore";

const FriendRequestModal = ({ onClose }) => {
  const [nickname, setNickname] = useState("");
  const { sendRequest } = useFriendStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname.trim()) return alert("친구의 닉네임을 입력해주세요.");
    sendRequest(nickname);
    setNickname("");
    onClose();
  };

  return (
    <div className="friend-modal-overlay" onClick={onClose}>
      <div className="friend-modal">
        <h2>친구 추가</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button type="submit">요청 보내기</button>
        </form>
        <button className="modal-close" onClick={onClose}>
          x
        </button>
      </div>
    </div>
  );
};

export default FriendRequestModal;
