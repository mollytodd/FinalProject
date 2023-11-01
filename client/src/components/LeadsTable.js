import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import LeadForm from "./LeadForm"; // Import the LeadForm component
import DeleteLeadButton from "./DeleteLeadButton";

const LeadsTable = () => {
  const [leads, setLeads] = useState([]);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const history = useHistory(); // Access the history object

  const handleDelete = (leadId) => {
    fetch(`http://localhost:5555/leads/${leadId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Disassociate the lead from its associated types in the front end
          const updatedLeads = leads.filter((lead) => lead.lead_id !== leadId);
          setLeads(updatedLeads);
        } else {
          console.error("Error deleting lead:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error deleting lead:", error);
      });
  };

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

  const handleAddLead = (newLead) => {
    // Send a POST request to your backend's /leads route
    fetch("http://localhost:5555/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLead),
    })
      .then((response) => {
        if (response.ok) {
          // Update the leads state with the new lead
          setLeads([...leads, newLead]);
          setIsAddingLead(false); // Hide the form
        } else {
          // Handle error
          console.error("Error adding lead:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error adding lead:", error);
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <Button colorScheme="teal" size="md" onClick={navigateToHome}>
          Back to Home
        </Button>
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => setIsAddingLead(true)}
        >
          Add New Lead
        </Button>
      </div>

      {isAddingLead ? (
        <LeadForm onAddLead={handleAddLead} />
      ) : (
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>NAME</Th>
              <Th>Phone Number</Th>
              <Th>Lead Type</Th>
              <Th>Stage</Th>
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
                <Td>
                  <DeleteLeadButton
                    onDeleteLead={handleDelete}
                    leadId={lead.lead_id}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  );
};

export default LeadsTable;
