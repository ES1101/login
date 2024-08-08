import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation();

  useEffect(() => {
    const linkColor = document.querySelectorAll(".nav__link");
    linkColor.forEach((link) => {
      if (link.getAttribute("href") === location.pathname) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }, [location.pathname]);

  return (
    <div id="body-pd">
      <div className="l-navbar" id="navbar">
        <nav className="nav">
          <div>
            <div className="nav__brand">
              <ion-icon
                name="menu-outline"
                className="nav__toggle"
                id="nav-toggle"
              ></ion-icon>

              {user ? (
                <Link to="/" style={{ fontSize: "15px" }} className="nav__logo">
                  <ion-icon name="happy-outline" /> {user.name}님 안녕하세요
                </Link>
              ) : (
                <Link
                  to="/login"
                  style={{ fontSize: "15px" }}
                  className="nav__logo"
                >
                  <ion-icon name="happy-outline" /> 로그인해주세요
                </Link>
              )}
            </div>
            <div className="nav__list">
              <Link
                to="/"
                className={`nav__link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <ion-icon name="home-outline" className="nav__icon"></ion-icon>
                <span className="nav_name">Home</span>
              </Link>
              <Link
                to="/mypage"
                className={`nav__link ${
                  location.pathname === "/mypage" ? "active" : ""
                }`}
              >
                <ion-icon
                  name="chatbubbles-outline"
                  className="nav__icon"
                ></ion-icon>
                <span className="nav_name">My page</span>
              </Link>

              {user && user.id === "admin" && (
                <Link
                  to="/manage"
                  className={`nav__link ${
                    location.pathname === "/manage" ? "active" : ""
                  }`}
                >
                  <ion-icon
                    name="settings-outline"
                    className="nav__icon"
                  ></ion-icon>
                  <span className="nav_name">Manage</span>
                </Link>
              )}
            </div>
            {user ? (
              <div
                onClick={onLogout}
                className="nav__link"
                style={{ cursor: "pointer" }}
              >
                <ion-icon
                  name="log-out-outline"
                  className="nav__icon"
                ></ion-icon>
                <span className="nav_name">Log out</span>
              </div>
            ) : (
              <Link to="/login" className="nav__link">
                <ion-icon
                  name="log-in-outline"
                  className="nav__icon"
                ></ion-icon>
                <span className="nav_name">Log in</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
