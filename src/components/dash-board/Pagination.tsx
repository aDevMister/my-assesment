import React from "react";
import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  indexOfLastItem: number;
  sortedUsersLength: number;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #6b7280;
  color: white;
  border-radius: 0.375rem;
  cursor: pointer;
  opacity: 0.5;

  &:not([disabled]):hover {
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  indexOfLastItem,
  sortedUsersLength,
}) => {
  return (
    <PaginationContainer>
      <Button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span>Page {currentPage}</span>
      <Button
        onClick={() => setCurrentPage((prev) => (indexOfLastItem < sortedUsersLength ? prev + 1 : prev))}
        disabled={indexOfLastItem >= sortedUsersLength}
      >
        Next
      </Button>
    </PaginationContainer>
  );
};

export default Pagination;
