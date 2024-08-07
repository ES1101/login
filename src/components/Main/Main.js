import React from "react";
import "./Main.css";

import chocho from "./chocho.jpg";

const Main = () => {
  return (
    <div className="Main">
      <div className="image-container">
        <img src={chocho} alt="Photo 2" className="mainCho" />
      </div>
    </div>
  );
};

export default Main;
