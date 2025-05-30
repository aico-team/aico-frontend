import { create } from "zustand";
import apiClient from "../src/lib/apiClient";

const useStudyStatStore = create((set) => ({
  todayStudyTime: null,
  streakCount: null,
  dailyStats: [],
  weeklyStats: [],

  fetchTodayStudyTime: async (userId) => {
    const response = await apiClient.get(`/study-time/today`, {
      params: { userId },
    });
    const seconds = response.data;
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");

    set({ todayStudyTime: `${h}:${m}:${s}` });
  },

  fetchStreakCount: async (userId) => {
    const response = await apiClient.get(`/study-time/streak`, {
      params: { userId },
    });
    set({ streakCount: response.data });
  },

  fetchDailyStats: async (userId, start, end) => {
    const response = await apiClient.get(`/study-time/daily`, {
      params: { userId, start, end },
    });
    set({ dailyStats: response.data });
  },

  fetchWeeklyStats: async (userId, date) => {
    const response = await apiClient.get(`/study-time/weekly`, {
      params: { userId, date },
    });
    set({ weeklyStats: response.data });
  },
}));

export default useStudyStatStore;
