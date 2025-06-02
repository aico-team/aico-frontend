import React from "react";
import useFriendStore from "../../../stores/friendStore";
import "../../styles/RecievedRequestCard.css";

const ReceivedRequestCard = ({ request }) => {
  const { acceptRequest, deleteFriend } = useFriendStore();

  return (
    <div className="received-request-card">
      <span>{request.friendNickname}</span>
      <button onClick={() => acceptRequest(request.friendShipId)}>수락</button>
      <button onClick={() => deleteFriend(request.friendShipId)}>거절</button>
    </div>
  );
};

export default ReceivedRequestCard;
