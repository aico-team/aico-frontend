import { create } from "zustand";
import apiClient from "../src/lib/apiClient";

const STORAGE_KEY = "study_timer";

const useStudyTimeStore = create((set, get) => ({
  seconds: 0,
  isRunning: false,
  intervalId: null,
  syncId: null,

  startTimer: () => {
    if (get().isRunning) return;

    const id = setInterval(() => {
      set((state) => {
        const newSeconds = state.seconds + 1;
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            seconds: newSeconds,
            startedAt: Date.now(),
            isRunning: true,
          })
        );
        return { seconds: newSeconds };
      });
    }, 1000);

    //1분간격 서버 전송 타이머ID
    const sync = setInterval(() => {
      get().syncWithServer();
    }, 60000);

    set({ isRunning: true, intervalId: id, syncId: sync });
  },

  stopTimer: () => {
    const { intervalId, syncId } = get();
    if (intervalId) clearInterval(intervalId);
    if (syncId) clearInterval(syncId);

    get().syncWithServer();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        seconds: get().seconds,
        startedAt: Date.now(),
        isRunning: false,
      })
    );

    set({ isRunning: false, intervalId: null, syncId: null });
  },

  syncWithServer: async () => {
    try {
      const totalSeconds = get().seconds;

      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.userId;

      if (!userId) {
        console.warn("userID 없음 공부 시간 저장 중단");
        return;
      }

      await apiClient.post(
        `/study-time?userId=${userId}&totalSeconds=${totalSeconds}`
      );
      console.log("공부 시간 서버 전송 성공:", totalSeconds, "초");
    } catch (err) {
      console.error("공부 시간 전송 실패:", err);
    }
  },

  formattedTime: () => {
    const total = get().seconds;
    const h = String(Math.floor(total / 3600)).padStart(2, "0");
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  },

  loadFromStorage: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;

    const parsed = JSON.parse(data);
    const { seconds, startedAt, isRunning } = parsed;

    //브라우저를 닫은 후 흐른 시간 반영
    const elapsed = Math.floor((Date.now() - startedAt) / 1000);
    const newSeconds = seconds + (isRunning ? elapsed : 0);

    set({ seconds: newSeconds });

    if (isRunning) {
      get().startTimer();
    }
  },
}));

export default useStudyTimeStore;
