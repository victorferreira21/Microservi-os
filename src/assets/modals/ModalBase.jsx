import React from "react";
import "../style/Modal.css";

export default function ModalBase({ onClose, children }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Fechar">✕</button>
        {children}
      </div>
    </div>
  );
}
