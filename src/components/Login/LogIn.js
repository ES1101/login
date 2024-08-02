import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";
// import axios from "axios";

import data from "../../data/db.json";
// *** axios.get("");

function Login() {
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

    console.log("id", inputId);
    console.log("password", inputPw);
    console.log("로그인 버튼 클릭");
    console.log(data);

    // 입력한 id와 pw가 일치하는 사용자를 찾음
    const user = data.users.find(
      (user) => user.id === inputId && user.pw === inputPw
    );

    // ***axios api로 서버에 있는 test 값을 get으로 가져온다.
    // then(그러면) [ (전달할 인자값) => { 내용을 처리 후 return 값 } ]
    // axios.get("http://localhost:5000/test").then((res) => {
    //   res.users.find((user = user.id === inputId && user.pw === inputPw));
    // });

    if (user) {
      alert("로그인 성공");
      navigate("/mypage", { state: { user } });
    } else {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const goToSignUp = () => {
    navigate("/SignUp"); // /signup 경로로 페이지 전환
  };
  const goToManage = () => {
    navigate("/Manage");
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <a className="Log-In">로그인 페이지를 만들어 보자</a> */}
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onClickLogin}
        >
          <label className="Id">Id</label>
          <input type="id" onChange={handleInputId} />
          <label className="Pw">Password</label>
          <input type="password" onChange={handleInputPw} />
          <br />
          <button className="LoginBt" onClick={onClickLogin} formAction="">
            Login
          </button>
          <button className="SignUpBt" onClick={goToSignUp} formAction="">
            회원가입
          </button>
          <button className="ManageBt" onClick={goToManage} formAction="">
            회원관리(임시버튼)
          </button>
        </form>
      </header>
    </div>
  );
}

export default Login;
