import React, { useState } from "react";
import styled from "styled-components";

interface UserCreateFormProps {
  onCreate: (name: string, email: string) => void;
  onClose: () => void;  
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const InputField = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #45a049;
  }
`;

const CloseButton = styled.button`
  margin-top: 20px;
  background: none;
  border: none;
  color: #888;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    color: #333;
  }
`;

const UserCreateForm: React.FC<UserCreateFormProps> = ({ onCreate, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(name, email);
    setName("");
    setEmail("");
    onClose();  
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <Title>Add New User</Title>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
            required
          />
          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email"
            required
          />
          <SubmitButton type="submit">Create User</SubmitButton>
        </form>
        <CloseButton onClick={onClose}>Cancel</CloseButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default UserCreateForm;
