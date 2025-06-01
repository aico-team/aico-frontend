import React, { useEffect } from "react";
import useFriendStore from "../../stores/friendStore";
import FriendRequestForm from "../components/friends/FriendRequestForm";
import ReceivedRequestsList from "../components/friends/ReceivedRequestsList";
import FriendsList from "../components/friends/FriendsList";

const FriendPage = () => {
  const { fetchFriends, fetchRequests } = useFriendStore();

  useEffect(() => {
    console.log("📥 fetchFriends(), fetchRequests() 호출됨");
    fetchFriends();
    fetchRequests();
  }, [fetchFriends, fetchRequests]);

  return (
    <div>
      <h1>👥 친구 관리</h1>
      <section>
        <FriendRequestForm />
      </section>

      <section>
        <ReceivedRequestsList />
      </section>

      <section>
        <FriendsList />
      </section>
    </div>
  );
};

export default FriendPage;
