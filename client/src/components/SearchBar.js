import React, { useState } from "react";
import { Input, Flex, InputGroup, InputRightElement } from "@chakra-ui/react";

const SearchBar = ({ leads, setSearchFilteredLeads }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
      console.log("Handling search...");
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

    setSearchFilteredLeads(filteredLeads);
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (e) => {
    console.log("Key pressed:", e.key);
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-end"
      p={2}
      maxW="lg"
      mx="auto"
    >
      <InputGroup>
        <Input
          type="text"
          placeholder="Filter..."
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          size="lg"
          style={{ width: "100%" }}
        />
        <InputRightElement width="4.5rem"></InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
