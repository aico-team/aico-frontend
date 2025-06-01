import React from "react";
import useFriendStore from "../../../stores/friendStore";
import ReceivedRequestCard from "./RecievedRequestCard";

const ReceivedRequestsList = () => {
  const { receivedRequests } = useFriendStore();

  if (!Array.isArray(receivedRequests)) {
    return <p>받은 요청 정보를 불러오는 중이거나 오류가 발생했습니다.</p>;
  }

  return (
    <div>
      <h2>받은 친구 요청</h2>
      {receivedRequests.length === 0 ? (
        <p>받은 요청이 없습니다.</p>
      ) : (
        receivedRequests.map((req) => (
          <ReceivedRequestCard key={req.friendShipId} request={req} />
        ))
      )}
    </div>
  );
};

export default ReceivedRequestsList;
