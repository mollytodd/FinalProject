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
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-end" // Align the search bar to the right
      p={2} // Adjust padding as needed
      maxW="lg" // Set the maximum width
      mx="auto" // Center horizontally
    >
      <InputGroup>
        <Input
          type="text"
          placeholder="Search by Name, Lead Type, or Stage"
          value={searchText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          size="lg" // Adjust the size
          style={{ width: "100%" }}
        />
        <InputRightElement width="4.5rem"></InputRightElement>
        <Button h="2rem" size="lg" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;