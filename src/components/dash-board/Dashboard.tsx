
import React, { useState, useEffect } from "react";
import { User } from "../../types"; 
import UserEditModal from "./UserEditModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import UserCreateForm from "./UserCreateForm";
import styled from "styled-components"; 
import { useUserStore } from "../../store/useUserStore";

const DashboardContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const AddButton = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  font-weight: bold;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 10px;
  margin: 0 5px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #f2f2f2;
  }
`;

const Dashboard: React.FC = () => {
  const { users, fetchUsers, addUser, updateUser, deleteUser } = useUserStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); 
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; 

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (user: User) => { 
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setSelectedUser(users.find((user) => user.id === id) || null);
    setIsDeleteModalOpen(true);
  };

  const handleSaveUser = (updatedUser: User) => { 
    if (updatedUser) {
      updateUser(updatedUser);
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
    }
    setIsDeleteModalOpen(false);
  };

  const handleCreateUser = (name: string, email: string) => {
    addUser({ id: Date.now(), name, email });
    setIsCreateFormVisible(false);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <DashboardContainer>
      <AddButton onClick={() => setIsCreateFormVisible(true)}>Add New User</AddButton>
      {isCreateFormVisible && <UserCreateForm onCreate={handleCreateUser} />}
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Serial No.</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1 + (currentPage - 1) * usersPerPage}</TableCell> 
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <ActionButton onClick={() => handleEdit(user)}>Edit</ActionButton>
                <ActionButton onClick={() => handleDelete(user.id)}>Delete</ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <PaginationContainer>
        <PageButton
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PageButton>
        <PageButton
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(users.length / usersPerPage)}
        >
          Next
        </PageButton>
      </PaginationContainer>

      {selectedUser && (
        <UserEditModal
          user={selectedUser}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteUser}
      />
    </DashboardContainer>
  );
};

export default Dashboard;
