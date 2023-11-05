import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import LeadForm from "./LeadForm";
import DeleteLeadButton from "./DeleteLeadButton";
import Loading from "./Loading";

const LeadsTable = ({handleSubmit}) => {
  const [leads, setLeads] = useState([]);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  const history = useHistory();

  const handleDelete = (leadId) => {
    fetch(`http://localhost:5555/leads/${leadId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
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
    const timer = setTimeout(() => {
      fetch("http://localhost:5555/leads")
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched leads data:", data);
          setLeads(data);
          setIsLoadingLeads(false); // Set loading state to false
        })
        .catch((error) => {
          console.error("Error fetching leads:", error);
          setIsLoadingLeads(false); // Set loading state to false
        });
    }, 2000); // Adjust the delay time as needed

    return () => clearTimeout(timer); // Clear timeout if the component is unmounted
  }, []);

  const navigateToHome = () => {
    history.push("/home");
  };


  // Fetch leads after a new lead is added

  const handleAddLead = (newLead) => {
    setLeads((prevLeads) => [...prevLeads, newLead]);
    setIsAddingLead(false);
  };
  useEffect(() => {
    if (!isAddingLead) {
      const timer = setTimeout(() => {
        fetch("http://localhost:5555/leads")
          .then((response) => response.json())
          .then((data) => {
            setLeads(data);
          })
          .catch((error) => {
            console.error("Error fetching leads:", error);
          });
      }, 2000); // Adjust the delay time as needed

      return () => clearTimeout(timer); // Clear timeout if the component is unmounted
    }
  }, [isAddingLead]);

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

      {isLoadingLeads ? (
        <Loading />
      ) : (
        <div style={{ display: "flex" }}>
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
      )}
    </div>
  );
};

export default LeadsTable;
