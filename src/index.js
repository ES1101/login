import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./components/App";

import reportWebVitals from "./reportWebVitals";
// reportWebVitals 성능 지표 수집 분석 개발자가 앱 성능 확인 및 개선할 수 있게 함

const root = ReactDOM.createRoot(document.getElementById("root"));
// reportWebVitals(console.log);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
