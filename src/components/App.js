import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import Manage from "./Manage/Manage";
import MyPage from "./MyPage/MyPage";
import Sidebar from "./Sidebars/sidebars";
import Main from "./Main/Main";
import Login from "./Login/LogIn";

function App() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      localStorage.setItem("isLoggedIn", "false");
      setUser(null);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/mypage");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
  };

  return (
    <div className="main-container">
      <Sidebar user={user} onLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/mypage" element={<MyPage user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
