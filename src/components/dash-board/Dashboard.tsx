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
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f7f8fa;
  border-radius: 8px;
  overflow:hidden;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const AddButton = styled.button`
  padding: 12px 20px;
  background-color: #5c6bc0;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    background-color: #3f51b5;
  }
`;

const SearchInput = styled.input`
  padding: 12px 20px;
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

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
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
  &:hover {
    background-color: #ddd;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #e0e0e0;
  }
`;

const Dashboard: React.FC = () => {
  const { users, fetchUsers, addUser, updateUser, deleteUser } = useUserStore();
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const debouncedSearch = useCallback(
    debounce((query) => setSearchQuery(query), 500),
    []
  );

  const filteredUsers = useMemo(() =>
    users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [users, searchQuery]
  );

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <DashboardContainer>
      <HeaderSection>
        <AddButton onClick={() => setIsCreateFormVisible(true)}>Add User</AddButton>
        <SearchInput placeholder="Search users..." onChange={(e) => debouncedSearch(e.target.value)} />
      </HeaderSection>
      
      {isCreateFormVisible && <UserCreateForm onCreate={(name, email) => addUser({ id: Date.now(), name, email })} onClose={() => setIsCreateFormVisible(false)} />}
      
      <TableWrapper>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>SN</TableHeader>
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
                  <ActionButton>Edit</ActionButton>
                  <ActionButton>Delete</ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      
      <PaginationContainer>
        <PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</PageButton>
        <PageButton disabled={currentPage === Math.ceil(users.length / usersPerPage)} onClick={() => setCurrentPage(currentPage + 1)}>Next</PageButton>
      </PaginationContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
