import axios from "axios";

const apiClient = axios.create({
    baseURL: "/api",
    timeout: 10000
});

//요청 인터셉터 : 모든 요청에 Access Token을 자동 첨부부
apiClient.interceptors.request.use(
    (config) => {
        //localStorage에서 Access Token 읽어오기
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
//응답 인터셉터 : 401 에러 발생 시 토큰 재발급 로직 수행
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // 만약 응답 상태가 401이고 재시도 플래그가 없으면 재시도 시도
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                //Refresh 토큰을 사용해 새로운 Access Token 요청
                const refreshResponse = await axios.post('/api/user/refresh-token');
                const newAccessToken = refreshResponse.data.accessToken;

                //새로운 Access Token을 localStorage에 저장
                localStorage.setItem("accessToken", newAccessToken);

                //원래 요청의 헤더에 새로운 토큰을 설정
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