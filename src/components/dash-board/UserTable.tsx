import React from "react";
import styled from "styled-components";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserTableProps {
  users: User[];
  deleteUser: (id: number) => void;
  handleSort: () => void;
  sortOrder: "asc" | "desc";
  currentItems: User[];
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e5e7eb;
`;

const TableHeader = styled.tr`
  background-color: #f3f4f6;
`;

const TableData = styled.td`
  border: 1px solid #e5e7eb;
  padding: 8px;
`;

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 0.375rem;
  margin: 0 8px;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

const DeleteButton = styled.button`
  color: #ef4444;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const UserTable: React.FC<UserTableProps> = ({
  users,
  deleteUser,
  handleSort,
  sortOrder,
  currentItems,
}) => {
  return (
    <div>
      <Button onClick={handleSort}>
        Sort by Name ({sortOrder})
      </Button>
      <Table>
        <thead>
          <TableHeader>
            <TableData>ID</TableData>
            <TableData>Name</TableData>
            <TableData>Email</TableData>
            <TableData>Actions</TableData>
          </TableHeader>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.id}>
              <TableData>{user.id}</TableData>
              <TableData>{user.name}</TableData>
              <TableData>{user.email}</TableData>
              <TableData>
                <DeleteButton onClick={() => deleteUser(user.id)}>
                  Delete
                </DeleteButton>
              </TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
