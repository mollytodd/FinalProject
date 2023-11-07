import React, { useState } from "react";
import {
  Input,
  Button,
  Flex,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const SearchBar = ({ leads, setFilteredLeads }) => {
  const [searchText, setSearchText] = useState("");
const handleSearch = () => {
  const filteredLeads = leads.filter((lead) => {
    return (
      (typeof lead.lead_name === "string" &&
        lead.lead_name.toLowerCase().includes(searchText.toLowerCase())) ||
      (
        (Array.isArray(lead.lead_type)
          ? lead.lead_type.join(" ")
          : lead.lead_type) || ""
      )
        .toString()
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      (typeof lead.stage === "string" &&
        lead.stage.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  setFilteredLeads(filteredLeads);
};

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Flex alignItems="center">
      <InputGroup>
        <Input
          type="text"
          placeholder="Search by Name, Lead Type, or Stage"
          value={searchText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleSearch}>
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
