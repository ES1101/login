import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";
import axios from "axios";

function Login({ onLogin }) {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const navigate = useNavigate();

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const onClickLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get("http://localhost:3001/users");
      const user = res.data.find(
        (user) => user.id === inputId && user.pw === inputPw
      );

      if (user) {
        alert("로그인 성공");
        localStorage.setItem("isLoggedIn", "true");
        onLogin(user); // 로그인 성공 시 사용자 정보를 App에 전달
      } else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const goToSignUp = () => {
    navigate("/SignUp");
  };

  return (
    <div className="App">
      <header className="App-header">
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onClickLogin}
        >
          <label className="Id">Id</label>
          <input type="id" value={inputId} onChange={handleInputId} />
          <label className="Pw">Password</label>
          <input type="password" value={inputPw} onChange={handleInputPw} />
          <br />
          <button className="LoginBt" onClick={onClickLogin}>
            Login
          </button>
          <button className="SignUpBt" onClick={goToSignUp}>
            회원가입
          </button>
        </form>
      </header>
    </div>
  );
}

export default Login;
