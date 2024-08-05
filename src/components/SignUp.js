import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Charts from "./Charts/Charts.js";

const SignUp = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // 폼 제출하고 페이지 새로고침 방지
    console.log("회원가입 ID:", userId);
    console.log("회원가입 Password:", password);
    console.log("회원가입 Name:", name);
    console.log("회원가입 Email:", email);
    console.log("회원가입 Phone number:", phoneNumber);

    // 새로운 사용자 정보를 객체로 만들음
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        // const users = response.data;
        // const existingUser = users.find((user) => user.id === userId);
        const users = response.data;
        const existingIdUser = users.find((user) => user.id === userId);
        const existingEmailUser = users.find((user) => user.email === email);
        const existingPhoneUser = users.find(
          (user) => user.phone === phoneNumber
        );

        if (existingIdUser) {
          alert("이미 존재하는 아이디입니다.");
        } else if (existingEmailUser) {
          alert("이미 존재하는 이메일입니다.");
        } else if (existingPhoneUser) {
          alert("이미 존재하는 전화번호입니다.");
        } else {
          const newUser = {
            id: userId,
            pw: password,
            name: name,
            email: email,
            phone: phoneNumber,
          };

          // if (existingUser) {
          //   alert("이미 존재하는 아이디입니다.");
          // } else {
          //   const newUser = {
          //     id: userId,
          //     pw: password,
          //     name: name,
          //     email: email,
          //     phone: phoneNumber,
          //   };

          axios
            .post("http://localhost:3001/users", newUser)
            .then((response) => {
              console.log("회원가입 성공:", response.data);
              alert("회원가입이 되었습니다.");
              navigate("/");
            })
            .catch((error) => {
              console.error("회원가입 중 에러 발생:", error);
            });
        }
      })
      .catch((error) => {
        console.error("사용자 목록을 조회할 수 없습니다.", error);
      });
    // 회원가입 후 로그인 페이지로 이동
  };

  return (
    <div className="SignUp">
      <header className="SignUp-header">
        <form className="SignUpForm" onSubmit={handleSignUp}>
          <label className="Id">Id</label>
          <input type="text" value={userId} onChange={handleUserIdChange} />
          <label className="Pw">Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <label className="name">name</label>
          <input type="text" value={name} onChange={handleNameChange} />
          <label className="email">email</label>
          <input type="text" value={email} onChange={handleEmailChange} />
          <label className="phone number">phone number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={handleNumberChange}
          />

          <br />
        </form>
        <button className="ConfirmBt" onClick={handleSignUp} type="submit">
          확인
        </button>
        <Charts />
      </header>
    </div>
  );
};
export default SignUp;
