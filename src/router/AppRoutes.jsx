import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurriculumList from "../pages/CurriculumList";

import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import TopicInput from "../pages/TopicInput";
import GeneratedCurriculum from "../pages/GeneratedCurriculum";

export default function AppRoutes() {
  const [curriculum, setCurriculum] = useState(null);
  const [topic, setTopic] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/TopicInput"
          element={
            <TopicInput setCurriculum={setCurriculum} setTopic={setTopic} />
          }
        />
        <Route
          path="/GeneratedCurriculum"
          element={
            <GeneratedCurriculum curriculum={curriculum} topic={topic} />
          }
        />
        <Route path="/CurriculumList" element={<CurriculumList />} />
        {/* 다른 라우트들 */}
      </Routes>
    </Router>
  );
}
