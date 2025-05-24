import React, { useState } from "react";
import "../components/GoalModal";
import GoalModal from "../components/GoalModal";

const Calendar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <h1>캘린더</h1>
      <button onClick={() => setIsOpen(true)}>열기</button>
      {isOpen && <GoalModal onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default Calendar;
