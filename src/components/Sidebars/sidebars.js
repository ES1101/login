import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    /* EXPANDER MENU */
    const showMenu = (toggleId, navbarId, bodyId) => {
      const toggle = document.getElementById(toggleId),
        navbar = document.getElementById(navbarId),
        bodypadding = document.getElementById(bodyId);

      if (toggle && navbar) {
        toggle.addEventListener("click", () => {
          navbar.classList.toggle("expander");
          bodypadding.classList.toggle("body-pd");
        });
      }
    };

    showMenu("nav-toggle", "navbar", "body-pd");

    /* COLLAPSE MENU */
    const linkCollapse = document.getElementsByClassName("collapse__link");
    for (let i = 0; i < linkCollapse.length; i++) {
      linkCollapse[i].addEventListener("click", function () {
        const collapseMenu = this.nextElementSibling;
        collapseMenu.classList.toggle("showCollapse");

        const rotate = collapseMenu.previousElementSibling;
        rotate.classList.toggle("rotate");
      });
    }

    // 로그인 상태를 확인하는 로직
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, []); // 빈 배열은 이 효과가 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    navigate("/login");
  };

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

              {isLoggedIn ? (
                <Link to="/" style={{ fontSize: "15px" }} className="nav__logo">
                  <ion-icon name="happy-outline" /> 안녕하세요
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

              {isLoggedIn && (
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
            {isLoggedIn ? (
              <div
                onClick={handleLogout}
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
