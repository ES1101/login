import React from "react";
import "./Modal.css";
// import image from "./assets/cat.png";

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal">      
    <span className="close-button" onClick={onClose}>
    &times;
  </span>
      <div className="modal-content">

       
        <div className="modal-contents">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
