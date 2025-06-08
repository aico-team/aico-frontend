import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/CalendarMiniCard.css";
import { format } from "date-fns";
import useGoalStore from "../../../stores/goalStore";

const CalendarMiniCard = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(new Date());
  const { goals, fetchGoals } = useGoalStore();

  const thisYear = new Date().getFullYear();
  const minDate = new Date(thisYear, 0, 1);
  const maxDate = new Date(thisYear, 11, 31);

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
  }, [goals]);

  return (
    <div className="calendar-scale">
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={(value) => {
          const dateStr = format(value, "yyyy-MM-dd");
          navigate(`/calendar?date=${dateStr}`);
        }}
        locale="en-us"
        minDate={minDate}
        maxDate={maxDate}
        formatShortWeekday={(locale, date) =>
          ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"][date.getDay()]
        }
        tileContent={({ date }) => {
          const dayStr = format(date, "yyyy-MM-dd");
          const goalsForDay = goals.filter((goal) => goal.deadline === dayStr);
          const hasIncomplete = goalsForDay.some((goal) => !goal.completed);
          const icon =
            goalsForDay.length > 0 ? (hasIncomplete ? "💦" : "✅") : null;

          return (
            <div className="calendar-icon">
              {icon ? (
                <span>{icon}</span>
              ) : (
                <span style={{ visibility: "hidden" }}>💦</span>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CalendarMiniCard;
