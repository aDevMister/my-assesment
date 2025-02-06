import React, { useState, useEffect, useMemo, useCallback } from "react";
import { User } from "../../types";
import UserEditModal from "./UserEditModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import UserCreateForm from "./UserCreateForm";
import styled from "styled-components";
import { useUserStore } from "../../store/useUserStore";
import debounce from "lodash.debounce";

// Styled components
const DashboardContainer = styled.div`
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f7f8fa;
  border-radius: 8px;
`;

const AddButton = styled.button`
  padding: 12px 20px;
  background-color: #5c6bc0;
  color: white;
  border: none;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    background-color: #3f51b5;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  background-color: #3f51b5;
  color: white;
  padding: 12px 20px;
  text-align: left;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #303f9f;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableCell = styled.td`
  padding: 12px 20px;
  text-align: left;
`;

const ActionButton = styled.button`
  padding: 8px 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 12px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #388e3c;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const PageButton = styled.button`
  padding: 12px 20px;
  margin: 0 8px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #ddd;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #e0e0e0;
  }
`;

const SearchInput = styled.input`
  padding: 12px 20px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const Dashboard: React.FC = () => {
  const { users, fetchUsers, addUser, updateUser, deleteUser } = useUserStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "email" | null>(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false));
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
    updateUser(updatedUser);
    setIsEditModalOpen(false);
  };

  const handleDeleteUser = () => {
    if (selectedUser) deleteUser(selectedUser.id);
    setIsDeleteModalOpen(false);
  };

  const handleCreateUser = (name: string, email: string) => {
    addUser({ id: Date.now(), name, email });
    setIsCreateFormVisible(false);
  };

  const debouncedSearch = useCallback(
    debounce((query) => setSearchQuery(query), 500),
    []
  );

  const sortedUsers = useMemo(() => {
    if (!sortBy) return users;
    return [...users].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [users, sortBy, sortOrder]);

  const filteredUsers = useMemo(
    () => sortedUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [sortedUsers, searchQuery]
  );

  const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <DashboardContainer>
      <AddButton onClick={() => setIsCreateFormVisible(true)}>Add New User</AddButton>
      <SearchInput placeholder="Search users..." onChange={(e) => debouncedSearch(e.target.value)} />
      
      {isCreateFormVisible && <UserCreateForm onCreate={handleCreateUser} onClose={() => setIsCreateFormVisible(false)} />}
      
      <Table>
        <thead>
          <TableRow>
            <TableHeader>SN</TableHeader>
            <TableHeader onClick={() => setSortBy("name")}>Name</TableHeader>
            <TableHeader onClick={() => setSortBy("email")}>Email</TableHeader>
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
        <PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</PageButton>
        <PageButton disabled={currentPage === Math.ceil(users.length / usersPerPage)} onClick={() => setCurrentPage(currentPage + 1)}>Next</PageButton>
      </PaginationContainer>
      
      <UserEditModal isOpen={isEditModalOpen} user={selectedUser} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveUser} />
      <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={handleDeleteUser} />
    </DashboardContainer>
  );
};

export default Dashboard;
