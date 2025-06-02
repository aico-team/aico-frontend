import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurriculumList from "../pages/CurriculumList";
import useAuthStore from "../../stores/authStore";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import TopicInput from "../pages/TopicInput";
import GeneratedCurriculum from "../pages/GeneratedCurriculum";
import Layout from "../components/layout/Layout";
import Landing from "../components/layout/Landing";
import QnaPage from "../pages/QnaPage";
import CalendarPage from "../pages/CalendarPage";
import TodoList from "../pages/TodoList";
import StudyTimeStat from "../pages/StudyTimeStat";

export default function AppRoutes() {
  const [curriculum, setCurriculum] = useState(null);
  const [topic, setTopic] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, [setUser]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
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
          <Route path="/QnaPage" element={<QnaPage />} />
          <Route path="/Calendar" element={<CalendarPage />} />
          <Route path="/TodoList" element={<TodoList />} />
          <Route path="/StudyTimeStat" element={<StudyTimeStat />} />
        </Route>
      </Routes>
    </Router>
  );
}
