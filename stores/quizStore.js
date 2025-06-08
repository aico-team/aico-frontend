import { create } from "zustand";
import apiClient from "../src/lib/apiClient";

const useQuizStore = create((set) => ({
  quizzes: [],
  isUploading: false,
  uploadError: null,

  uploadQuizImage: async (file) => {
    set({ isUploading: true, uploadError: null });

    const formData = new FormData();
    formData.append("multipartFile", file);

    try {
      const response = await apiClient.post("/quiz", formData);
      const data = response.data;

      const parsedQuizzes = [];

      for (const key in data) {
        const match = key.match(/^quiz(\d+)$/);
        if (match) {
          const index = match[1]; //quiz 개수
          const quiz = data[`quiz${index}`];
          const answer = data[`ans${index}`];

          if (quiz && answer) {
            parsedQuizzes.push({
              quiz,
              answer,
              imageUrl: data.imageUrl,
              fileName: data.fileName,
              originalFileName: data.originalFileName,
            });
          }
        }
      }
      set({ quizzes: parsedQuizzes });
    } catch (err) {
      console.error("사진 업로드에 실패", err);
      set({ uploadError: err });
    } finally {
      set({ isUploading: false });
    }
  },
}));

export default useQuizStore;
