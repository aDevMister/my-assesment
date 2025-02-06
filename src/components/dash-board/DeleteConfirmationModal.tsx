
import React from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const ModalButton = styled.button`
  width: 48%;
  padding: 10px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const ConfirmButton = styled(ModalButton)`
  background-color: #4caf50;
`;

const CancelButton = styled(ModalButton)`
  background-color: #f44336;
`;

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContainer>
        <ModalTitle>Are you sure?</ModalTitle>
        <p>Do you want to delete this user?</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ConfirmButton onClick={onDelete}>Delete</ConfirmButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </div>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default DeleteConfirmationModal;
