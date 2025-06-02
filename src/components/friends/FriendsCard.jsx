import React, { useState } from "react";
import useFriendStore from "../../../stores/friendStore";
import "../../styles/FriendCard.css";
import userDefaultprofileImage from "../../assets/default-profile.png";

const FriendsCard = ({ friend }) => {
  const { deleteFriend } = useFriendStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="friend-card">
      <div className="friend-info">
        <div className="friend-left">
          <img
            src={userDefaultprofileImage}
            alt="기본 프로필"
            className="friend-profile"
          />

          <span>{friend.friendNickname}</span>
        </div>
        <div className="friend-actions">
          <button onClick={() => deleteFriend(friend.friendShipId)}>
            삭제
          </button>
          <button onClick={() => setOpen((prev) => !prev)}>
            {open ? "접기" : "프로필 보기"}
          </button>
        </div>
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
