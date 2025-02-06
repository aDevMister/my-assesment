
import React, { useState, useEffect } from "react";
import { User } from "../../types";
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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
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

const SaveButton = styled(ModalButton)`
  background-color: #4caf50;
`;

const CancelButton = styled(ModalButton)`
  background-color: #f44336;
`;

interface UserEditModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedUser, setEditedUser] = useState<User | null>(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (editedUser) {
      onSave(editedUser); 
      onClose(); 
    }
  };

  if (!isOpen || !editedUser) return null; 

  return (
    <ModalBackdrop>
      <ModalContainer>
        <ModalTitle>Edit User</ModalTitle>
        <Input
          type="text"
          name="name"
          value={editedUser.name}
          onChange={handleInputChange}
          placeholder="Enter user name"
        />
        <Input
          type="email"
          name="email"
          value={editedUser.email}
          onChange={handleInputChange}
          placeholder="Enter user email"
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <SaveButton onClick={handleSave}>Save</SaveButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </div>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default UserEditModal;
