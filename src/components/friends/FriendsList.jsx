import React from "react";
import useFriendStore from "../../../stores/friendStore";
import FriendsCard from "./FriendsCard";

const FriendsList = () => {
  const { friends } = useFriendStore();

  if (!Array.isArray(friends)) {
    return <p>친구 정보를 불러오는 중이거나 오류가 발생했습니다.</p>;
  }

  return (
    <div className="friend-list-container">
      {friends.length === 0 ? (
        <p>등록된 친구가 없습니다.</p>
      ) : (
        friends.map((f) => <FriendsCard key={f.friendShipId} friend={f} />)
      )}
    </div>
  );
};

export default FriendsList;
