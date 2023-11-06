import React from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa"; // Import the search icon

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  leads,
  setFilteredLeads,
}) => {
  const handleSearch = (query) => {
    const filteredLeads = leads.filter((lead) =>
      lead.lead_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLeads(filteredLeads);
    setSearchQuery(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Detect Enter key press and perform the search
      handleSearch(searchQuery);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "0",
        paddingTop: "20px",
      }}
    >
      <InputGroup>
        <Input
          type="text"
          placeholder="Search leads by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <InputRightElement
          children={<FaSearch onClick={() => handleSearch(searchQuery)} />} // Clicking the icon performs the search
          style={{ cursor: "pointer", marginRight: "5px" }}
        />
      </InputGroup>
    </div>
  );
};

export default SearchBar;
