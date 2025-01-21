import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20"
    >
      <div className="relative p-4 bg-white rounded">{children}</div>
    </div>
  );
};

export default Modal;
