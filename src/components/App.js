import React from "react";
import { Route, Routes } from "react-router-dom";
import LogIn from "./Login/LogIn";
import SignUp from "./SignUp";
import Manage from "./Manage/Manage";
import MyPage from "./MyPage/MyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/manage" element={<Manage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}

export default App;
