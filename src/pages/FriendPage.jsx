import React, { useEffect, useState } from "react";
import useFriendStore from "../../stores/friendStore";
import FriendsList from "../components/friends/FriendsList";
import FriendRequestModal from "../components/friends/FriendRequestModal";
import "../styles/FriendPage.css";

const FriendPage = () => {
  const { fetchFriends, fetchRequests } = useFriendStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("📥 fetchFriends(), fetchRequests() 호출됨");
    fetchFriends();
    fetchRequests();
  }, [fetchFriends, fetchRequests]);

  return (
    <div>
      <h1>👥 친구 관리</h1>
      <div className="friend-page-header">
        <h2>내 친구 목록</h2>
        <button
          className="friend-add-button"
          onClick={() => setShowModal(true)}
        >
          + 친구 요청
        </button>
      </div>
      <div className="friend-page-container">
        {showModal && (
          <FriendRequestModal onClose={() => setShowModal(false)} />
        )}
        <section>
          <FriendsList />
        </section>
      </div>
    </div>
  );
};

export default FriendPage;
