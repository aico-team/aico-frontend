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
      set({ quizzes: response.data });
    } catch (err) {
      console.error("사진 업로드에 실패", err);
      set({ uploadError: err });
    } finally {
      set({ isUploading: false });
    }
  },
}));

export default useQuizStore;
