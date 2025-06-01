import { create } from "zustand";
import apiClient from "../src/lib/apiClient";

const useFriendStore = create((set) => ({
  friends: [],
  receivedRequests: [],

  //친구 목록 불러오기
  fetchFriends: async () => {
    try {
      const response = await apiClient.get("/friend/list");

      if (Array.isArray(response.data)) {
        set({ friends: response.data });
      } else {
        console.warn("⚠️ 예상치 못한 응답 형식, 더미로 대체됨");

        set({
          friends: [
            { friendShipId: 1, friendNickname: "김은진" },
            { friendShipId: 2, friendNickname: "김지호" },
          ],
        });
      }
    } catch (err) {
      console.error("친구 목록 가져오기 실패:", err);
      // 💡 백엔드 연결 실패 시 더미 데이터로 대체
      set({
        friends: [
          { friendShipId: 1, friendNickname: "김은진" },
          { friendShipId: 2, friendNickname: "김지호" },
        ],
      });
    }
  },

  //친구 요청 불러오기
  fetchRequests: async () => {
    try {
      const response = await apiClient.get("/friend/request");

      if (Array.isArray(response.data)) {
        set({ receivedRequests: response.data });
      } else {
        console.warn("⚠️ 예상치 못한 응답 형식, 더미로 대체됨");
        set({
          receivedRequests: [
            { friendShipId: 101, friendNickname: "이프론트" },
            { friendShipId: 102, friendNickname: "최풀스택" },
          ],
        });
      }
    } catch (err) {
      console.error("요청 목록 가져오기에 실패:", err);
      // 💡 실패 시 더미 요청 목록 사용
      set({
        receivedRequests: [
          { friendShipId: 101, friendNickname: "이프론트" },
          { friendShipId: 102, friendNickname: "최풀스택" },
        ],
      });
    }
  },

  //친구 요청 보내기
  sendRequest: async (nickname) => {
    try {
      await apiClient.post(`/friend/${nickname}`);
      alert("친구 요청을 보냈습니다.");
    } catch (err) {
      alert("친구 요청 실패: " + err.response?.data?.message || err.message);
    }
  },

  //친구 요청 수락하기
  acceptRequest: async (friendShipId) => {
    try {
      await apiClient.post(`/friend/accept/${friendShipId}`);
      await Promise.all([
        useFriendStore.getState().fetchRequests(),
        useFriendStore.getState().fetchFriends(),
      ]);
    } catch (err) {
      console.error("친구 요청 수락 실패:", err);
    }
  },

  //친구 삭제하기 - 요청 거절하기
  deleteFriend: async (friendShipId) => {
    try {
      await apiClient.delete(`/friend/delete/${friendShipId}`);
      await Promise.all([
        useFriendStore.getState().fetchRequests(),
        useFriendStore.getState().fetchFriends(),
      ]);
    } catch (err) {
      console.error("친구 삭제 실패:", err);
    }
  },
}));

export default useFriendStore;
