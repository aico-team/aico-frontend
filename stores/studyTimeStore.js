import { create } from "zustand";

const STORAGE_KEY = "study_timer";

const useStudyTimeStore = create((set, get) => ({
  seconds: 0,
  isRunning: false,
  intervalId: null,

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

    set({ isRunning: true, intervalId: id });
  },

  stopTimer: () => {
    const id = get().intervalId;
    if (id) {
      clearInterval(id);
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        seconds: get().seconds,
        startedAt: Date.now(),
        isRunning: false,
      })
    );

    set({ isRunning: false, intervalId: null });
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

    //흐른 시간 반영
    const elapsed = Math.floor((Date.now() - startedAt) / 1000);
    const newSeconds = seconds + (isRunning ? elapsed : 0);

    set({ seconds: newSeconds });

    if (isRunning) {
      get().startTimer();
    }
  },
}));

export default useStudyTimeStore;
