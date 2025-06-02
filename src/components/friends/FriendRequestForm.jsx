import React, { useState } from "react";
import useFriendStore from "../../../stores/friendStore";

const FriendRequestForm = () => {
  const [nickname, setNickname] = useState("");
  const { sendRequest } = useFriendStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname.trim()) return alert("닉네임을 입력해주세요.");
    sendRequest(nickname);
    setNickname("");
  };

  return (
    <div>
      <h2> 친구 요청 보내기</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="상대 닉네임 입력"
        />
        <button type="submit">요청</button>
      </form>
    </div>
  );
};

export default FriendRequestForm;
