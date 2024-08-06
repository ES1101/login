import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./components/App";
// import Sidebars from "./components/Sidebars/sidebars";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      {/* <div className="main-container"> */}
      {/* <Sidebars /> */}
      {/* <div className="main-content"> */}
      <App />
      {/* </div> */}
      {/* </div> */}
    </Router>
  </React.StrictMode>
);

reportWebVitals();
