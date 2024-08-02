import React from "react";
import "./Modal.css";
// import image from "./assets/cat.png";

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-overlay" onClick={onClose}>
          <a>X</a>
        </span>
        <br />
        <br />
        <div className="modal-contents">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
