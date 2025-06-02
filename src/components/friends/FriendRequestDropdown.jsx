import React from "react";
import ReceivedRequestCard from "./RecievedRequestCard";
import { createPortal } from "react-dom";
import "../../styles/FriendRequestDropdown.css";

const FriendRequestDropdown = ({ receivedRequests }) => {
  return createPortal(
    <div className="friend-request-dropdown">
      <h4>받은 친구 요청</h4>
      {Array.isArray(receivedRequests) && receivedRequests.length > 0 ? (
        receivedRequests.map((req) => (
          <ReceivedRequestCard key={req.friendShipId} request={req} />
        ))
      ) : (
        <div className="empty-request-message">
          <p>받은 친구 요청이 없습니다.</p>
        </div>
      )}
    </div>,
    document.body
  );
};

export default FriendRequestDropdown;
