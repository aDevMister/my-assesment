
import React, { useState } from "react";

interface UserCreateFormProps {
  onCreate: (name: string, email: string) => void;
}

const UserCreateForm: React.FC<UserCreateFormProps> = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(name, email);
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="user-create-form">
      <h2>Add New User</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter user email"
        required
      />
      <button type="submit">Create User</button>
    </form>
  );
};

export default UserCreateForm;
