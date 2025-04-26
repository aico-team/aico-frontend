import React, { useState } from "react";
import apiClient from "../lib/apiClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

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

      console.log("로그인에 성공했습니다.", response.data);

      //Authorization 헤더에서 토큰 읽기
      const rawHeader = response.headers["authorization"];
      const accessToken = rawHeader?.split(" ")[1];
      //Access Token은 localStorage에 저장
      localStorage.setItem("accessToken", accessToken);

      //로그인 성공 후 사용자를 대시보드 등 보호된 페이지로 이동
      navigate("/dashboard");
    } catch (err) {
      setError("로그인에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <div>
          <div>
            <label htmlFor="email">이메일</label>
          </div>
          <input
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
          <button type="submit">로그인</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
