import React from "react";
import styled from "styled-components";

interface SearchProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (query: string) => void;
}

const Input = styled.input`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const Search: React.FC<SearchProps> = ({ search, setSearch, handleSearch }) => {
  return (
    <Input
      type="text"
      placeholder="Search users..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  );
};

export default Search;
