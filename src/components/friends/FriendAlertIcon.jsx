import React, { useState } from "react";
import useFriendStore from "../../../stores/friendStore";
import { HiBellAlert } from "react-icons/hi2";
import FriendRequestDropdown from "./FriendRequestDropdown";
import "../../styles/FriendAlertIcon.css";

const FriendAlertIcon = () => {
  const [open, setOpen] = useState(false);
  const { receivedRequests, fetchRequests } = useFriendStore();

  const toggleDropDown = () => {
    if (!open) fetchRequests();
    setOpen((prev) => !prev);
  };

  return (
    <div className="friend-alert-container">
      <button className="alert-icon-button" onClick={toggleDropDown}>
        <HiBellAlert />
        {receivedRequests.length > 0 && <span className="alert-badge" />}
      </button>
      {open && <FriendRequestDropdown receivedRequests={receivedRequests} />}
    </div>
  );
};

export default FriendAlertIcon;
