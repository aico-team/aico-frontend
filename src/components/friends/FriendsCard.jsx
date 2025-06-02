import React, { useState } from "react";
import useFriendStore from "../../../stores/friendStore";

const FriendsCard = ({ friend }) => {
  const { deleteFriend } = useFriendStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="friend-card">
      <div>
        <span>{friend.friendNickname}</span>
        <button onClick={() => deleteFriend(friend.friendShipId)}>삭제</button>
        <button onClick={() => setOpen((prev) => !prev)}>
          {open ? "접기" : "프로필 보기"}
        </button>
      </div>
      {open && (
        <div className="friend-profile-detail">
          <p>부가 항목</p>{" "}
        </div>
      )}
    </div>
  );
};

export default FriendsCard;
