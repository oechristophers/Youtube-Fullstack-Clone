import React, { useEffect } from "react";
import styled from "styled-components";

// Styled Overlay for background blur
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  z-index: 5040;
`;

// Styled Modal Content with centering
const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.bg || "white"};
  color: ${({ theme }) => theme.text || "black"};
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  z-index: 5050;
  max-width: 90%;
  width: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
`;

// Close button style
const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text || "black"};
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary || "#007bff"};
  }
`;

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscKey);
    }

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <Overlay
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
      />
      <ModalContent>
        <CloseButton
        onClick={onClose}
        >×</CloseButton>
        {children}
      </ModalContent>
    </>
  );
};

export default Modal;
