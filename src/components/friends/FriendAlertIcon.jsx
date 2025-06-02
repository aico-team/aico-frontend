import React, { useEffect, useState, useRef } from "react";
import useFriendStore from "../../../stores/friendStore";
import { HiBellAlert } from "react-icons/hi2";
import FriendRequestDropdown from "./FriendRequestDropdown";
import "../../styles/FriendAlertIcon.css";

const FriendAlertIcon = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { receivedRequests, fetchRequests } = useFriendStore();

  const toggleDropDown = () => {
    if (!open) fetchRequests();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="friend-alert-container" ref={dropdownRef}>
      <button className="alert-icon-button" onClick={toggleDropDown}>
        <HiBellAlert />
        {receivedRequests.length > 0 && <span className="alert-badge" />}
      </button>
      {open && <FriendRequestDropdown receivedRequests={receivedRequests} />}
    </div>
  );
};

export default FriendAlertIcon;
