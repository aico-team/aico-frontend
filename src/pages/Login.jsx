import React, { useState } from "react";
import apiClient from "../lib/apiClient";
import "../styles/Login.css";
import useAuthStore from "../../stores/authStore";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const { setUser } = useAuthStore();

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 리로드 방지 사용자 경험을 위해

    try {
      const response = await apiClient.post("/user/login", {
        email: input.email,
        password: input.password,
      });

      console.log("🔥 로그인 응답:", response.data);

      //accessToken 저장
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      console.log(
        "✅ 저장된 accessToken:",
        localStorage.getItem("accessToken")
      );

      //사용자 정보 저장
      const userData = {
        userId: response.data.userId,
        nickname: response.data.nickname,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      console.log("로그인에 성공했습니다.", response.data);

      window.location.href = "/dashboard";
    } catch (err) {
      setError("로그인에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="logo">Aico</div>
      <form onSubmit={handleSubmit}>
        {/* <h1>로그인</h1> 삭제 */}
        <div>
          <div>
            <label htmlFor="email">이메일</label>
          </div>
          <input
            className="input-email"
            type="email"
            id="email"
            name="email"
            value={input.email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <div>
            <label htmlFor="password">비밀번호</label>
          </div>
          <input
            className="input-password"
            type="password"
            id="password"
            name="password"
            value={input.password}
            onChange={onChange}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <button type="submit" className="button">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
