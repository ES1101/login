import React from "react";
import { Route, Routes } from "react-router-dom";
import LogIn from "./Login/LogIn";
import SignUp from "./SignUp";
import Manage from "./Manage/Manage";
import MyPage from "./MyPage/MyPage";
import Sidebar from "./Sidebars/sidebars"; // 사이드바 컴포넌트를 임포트합니다

function App() {
  return (
    <div className="main-container">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
