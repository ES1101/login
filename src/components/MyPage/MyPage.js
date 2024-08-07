import React from "react";
import "./MyPage.css";

const MyPage = ({ user }) => {
  return (
    <div className="MyPage">
      <div className="PageDiv">
        {user ? (
          <h1>{user.name}님 환영합니다</h1>
        ) : (
          <a>먼저 로그인을 해주세요.</a>
        )}
      </div>
    </div>
  );
};

export default MyPage;
