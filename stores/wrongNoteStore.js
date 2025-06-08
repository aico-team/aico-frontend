import { create } from "zustand";
import apiClient from "../src/lib/apiClient";

const useWrongNoteStore = create((set, get) => ({
  wrongQuizzes: [],
  isLoading: false,

  fetchWrongQuizzes: async () => {
    set({ isLoading: true });

    try {
      const response = await apiClient.get("/quiz/wrong-notes");

      if (!Array.isArray(response.data)) {
        throw new Error("유효하지 않은 퀴즈 데이터 응답");
      }

      set({ wrongQuizzes: response.data, isLoading: false });
    } catch (err) {
      console.error("오답 불러오기 실패:", err);
      set({ wrongQuizzes: [], isLoading: false });
    }
  },

  saveWrongQuiz: async (quizData) => {
    const { quiz, answer } = quizData;
    const existing = get().wrongQuizzes.some((file) =>
      file.quizzes.some((q) => q.quiz === quiz && q.answer === answer)
    );

    if (existing) {
      alert("이미 저장된 오답입니다.");
      return;
    }

    try {
      await apiClient.post("/quiz/save", quizData);
      await get().fetchWrongQuizzes();
      console.log("오답 노트 저장 성공:", quizData);
    } catch (err) {
      console.error("오답 노트 저장 실패", err);
    }
  },

  deleteWrongQuizzes: async (quizId) => {
    try {
      await apiClient.delete(`/quiz/${quizId}`);
      set((state) => ({
        wrongQuizzes: state.wrongQuizzes.map((file) => ({
          ...file,
          quizzes: file.quizzes.filter((q) => q.id !== quizId),
        })),
      }));
    } catch (err) {
      console.error("오답 퀴즈 삭제 실패", err);
    }
  },
}));

export default useWrongNoteStore;
