import React from "react";
import "./MyPage.css";
import { useLocation } from "react-router-dom";

const MyPage = () => {
  const location = useLocation();
  const { user } = location.state || {}; // location.state가 없을 경우 대비
  return (
    <div className="MyPage">
      <div>
        {user ? (
          <h1>{user.name}님 환영합니다</h1>
        ) : (
          <h1>로그인된 사용자가 없습니다.</h1>
        )}
      </div>
    </div>
  );
};
export default MyPage;
