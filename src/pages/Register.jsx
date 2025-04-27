import React, { useState } from "react";
import apiClient from "../lib/apiClient";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [input, setInput] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [emailCheckResult, setEmailCheckResult] = useState(null);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConfirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await apiClient.post("/user/signup", {
        email: input.email,
        password: input.password,
        confirmPassword: input.confirmPassword,
        nickname: input.nickname,
      });

      console.log("회원가입 성공:", response.data);
      navigate("/login");
    } catch (err) {
      setError("회원가입에 실패했습니다.");
      console.error(err);
    }
  };

  const handleEmailCheck = async () => {
    //이메일을 입력하지 않은 채 중복검사시
    if (!input.email.trim()) {
      setEmailCheckResult("이메일을 입력해주세요.");
      return;
    }

    try {
      const res = await apiClient.get(`/user/duplicate?email=${input.email}`);

      if (res.data === true) {
        setEmailCheckResult("이미 사용 중인 이메일입니다.");
      } else {
        setEmailCheckResult("사용 가능한 이메일입니다.");
      }
    } catch (err) {
      console.error(err);
      setEmailCheckResult("오류가 발생했습니다.");
    }
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setInput({
      ...input,
      confirmPassword: value,
    });

    if (input.password === value) {
      setIsConfirmPassword(true);
    } else {
      setIsConfirmPassword(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <div>
          <div>
            <label htmlFor="nickname">닉네임</label>
          </div>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={input.nickname}
            onChange={onChange}
            required
          />
        </div>
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
          <button type="button" onClick={handleEmailCheck}>
            중복 확인
          </button>

          {emailCheckResult && (
            <p
              style={{
                color: emailCheckResult.includes("가능") ? "blue" : "red",
              }}
            >
              {emailCheckResult}
            </p>
          )}
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
            placeholder="비밀번호는 최소 4자 ~ 최대 16자"
            required
          />
        </div>
        <div>
          <div>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
          </div>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleConfirmPassword}
            placeholder="비밀번호를 한 번 더 입력해주세요."
            required
          />
          {input.confirmPassword && (
            <p style={{ color: isConfirmPassword ? "blue" : "red" }}>
              {isConfirmPassword
                ? "비밀번호가 일치합니다."
                : "비밀번호가 일치하지 않습니다."}
            </p>
          )}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <button type="submit">가입하기</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
