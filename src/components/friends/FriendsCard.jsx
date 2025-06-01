import React from "react";
import useFriendStore from "../../../stores/friendStore";

const FriendsCard = ({ friend }) => {
  const { deleteFriend } = useFriendStore();
  return (
    <div>
      <span>{friend.friendNickname}</span>
      <button onClick={() => deleteFriend(friend.friendShipId)}>삭제</button>
    </div>
  );
};

export default FriendsCard;
