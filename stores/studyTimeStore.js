import { create } from "zustand";

const useStudyTimeStore = create((set, get) => ({
  isRunning: false,
  seconds: 0,
  timerId: null,

  startTimer: () => {
    if (get().isRunning) return;

    const id = setInterval(() => {
      set((state) => ({ seconds: state.seconds + 1 }));
    }, 1000);

    set({ isRunning: true, timerId: id });
  },

  stopTimer: () => {
    clearInterval(get().timerId);
    set({ isRunning: false, timerId: null });
  },

  formattedTime: () => {
    const total = get().seconds;
    const h = String(Math.floor(total / 3600)).padStart(2, "0");
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  },
}));

export default useStudyTimeStore;
