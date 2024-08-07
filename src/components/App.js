import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Manage from "./Manage/Manage";
import MyPage from "./MyPage/MyPage";
import Sidebar from "./Sidebars/sidebars"; // 사이드바 컴포넌트를 임포트합니다
import Main from "./Main/Main";
import Login from "./Login/LogIn";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // 앱이 처음 로드될 때 로그아웃 상태로 설정
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
  }, []);
  return (
    <div className="main-container">
      <Sidebar isLoggedIn={isLoggedIn} />
      <div className="main-content">
        <Routes>
          {/* <Route path="/" element={<LogIn />} /> */}
          <Route path="/" element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
