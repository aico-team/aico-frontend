import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useStudyStatStore from "../../stores/studyStatStore";

const StudyTimeBarChart = () => {
  const { dailyStats } = useStudyStatStore();

  const data = Array.isArray(dailyStats)
    ? dailyStats.map((item) => ({
        date: item.date,
        minutes: item.minutes,
      }))
    : [];

  if (!data.length) {
    return <p style={{ textAlign: "center" }}>📉 표시할 데이터가 없습니다.</p>;
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <ResponsiveContainer maxWidth="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit="분" />
          <Tooltip />
          <Bar dataKey="minutes" fill="#6edac9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudyTimeBarChart;
