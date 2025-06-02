import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("💥 interceptor - token from localStorage:", accessToken);
    if (accessToken && accessToken !== "undefined") {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      console.log(
        "✅ Authorization header 붙음:",
        config.headers["Authorization"]
      );
    } else {
      delete config.headers["Authorization"]; // 혹시라도 헤더에 남아있을 경우 제거
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.headers["X-Token-Expired"] === "true" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await apiClient.post("/user/refresh-token");
        const newAccessToken = refreshResponse.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
