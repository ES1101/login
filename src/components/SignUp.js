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
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateUserId = (value) => /^[a-zA-Z0-9]{4,10}$/.test(value); // 아이디는 4~10자의 영문자 및 숫자
  const validatePassword = (value) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value); // 최소 8자, 하나 이상의 문자와 하나의 숫자
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // 간단한 이메일 형식 확인
  const validatePhoneNumber = (value) => /^\d{10,11}$/.test(value); // 10~11자의 숫자
  const validateName = (value) => value.length > 0; // 이름은 공백이 아니어야 함

  const handleUserIdChange = (e) => {
    const value = e.target.value;
    setUserId(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      userId: validateUserId(value)
        ? ""
        : "아이디는 4~10자의 영문자 및 숫자여야 합니다.",
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(value)
        ? ""
        : "비밀번호는 최소 8자, 하나 이상의 문자와 숫자를 포함해야 합니다.",
    }));
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(value) ? "" : "유효한 이메일 형식을 입력하세요.",
    }));
  };
  const handleNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNumber: validatePhoneNumber(value)
        ? ""
        : "전화번호는 10~11자의 숫자여야 합니다.",
    }));
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: validateName(value) ? "" : "이름을 입력하세요.",
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // 폼 제출하고 페이지 새로고침 방지

    if (!userId || !password || !email || !phoneNumber || !name) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (Object.values(errors).some((error) => error)) {
      alert("입력값을 확인해주세요.");
      return;
    }

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
          {errors.userId && <div className="error">{errors.userId}</div>}

          <label className="Pw">Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}

          <label className="name">name</label>
          <input type="text" value={name} onChange={handleNameChange} />
          {errors.name && <div className="error">{errors.name}</div>}
          <label className="email">email</label>
          <input type="text" value={email} onChange={handleEmailChange} />
          {errors.email && <div className="error">{errors.email}</div>}
          <label className="phone number">phone number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={handleNumberChange}
          />
          {errors.phoneNumber && (
            <div className="error">{errors.phoneNumber}</div>
          )}

          <br />
        </form>
        <button className="ConfirmBt" onClick={handleSignUp} type="submit">
          확인
        </button>
        {/* <Charts /> */}
      </header>
    </div>
  );
};
export default SignUp;
