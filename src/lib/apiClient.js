import axios from "axios";

const apiClient = axios.create({
    baseURL: "/api",
    timeout: 10000
});

//��û ���ͼ��� : ��� ��û�� Access Token�� �ڵ� ÷�κ�
apiClient.interceptors.request.use(
    (config) => {
        //localStorage���� Access Token �о����
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
//���� ���ͼ��� : 401 ���� �߻� �� ��ū ��߱� ���� ����
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // ���� ���� ���°� 401�̰� ��õ� �÷��װ� ������ ��õ� �õ�
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                //Refresh ��ū�� ����� ���ο� Access Token ��û
                const refreshResponse = await axios.post('/api/user/refresh-token');
                const newAccessToken = refreshResponse.data.accessToken;

                //���ο� Access Token�� localStorage�� ����
                localStorage.setItem("accessToken", newAccessToken);

                //���� ��û�� ����� ���ο� ��ū�� ����
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