import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";

const LeadsTable = () => {
  const [leads, setLeads] = useState([]);
  const history = useHistory(); // Access the history object

  useEffect(() => {
    // Fetch leads data from the API
    fetch("http://localhost:5555/leads")
      .then((response) => response.json())
      .then((data) => {
        setLeads(data);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  }, []);

  // Function to navigate back to the home route
  const navigateToHome = () => {
    history.push("/home");
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", margin: "10px" }}
      >
        <Button colorScheme="teal" size="md" onClick={navigateToHome}>
          Back to Home
        </Button>
      </div>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>NAME</Th>
            <Th>Phone Number</Th>
            <Th>Lead Type</Th>
            <Th>Notes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {leads.map((lead) => (
            <Tr key={lead.lead_id}>
              <Td>{lead.lead_name}</Td>
              <Td>{lead.phone_number}</Td>
              <Td>{lead.lead_type}</Td>
              <Td>{lead.stage}</Td>
              <Td>{lead.notes}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default LeadsTable;
