import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import LeadForm from "./LeadForm";
import DeleteLeadButton from "./DeleteLeadButton";
import Loading from "./Loading";
import SearchBar from "./SearchBar";

const LeadsTable = ({ handleSubmit }) => {
  const [leads, setLeads] = useState([]);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]); // Initialize filteredLeads state here
  const history = useHistory();

  const handleSearch = (query) => {
    // Filter the leads based on the search query
    const filteredLeads = leads.filter((lead) =>
      lead.lead_name.toLowerCase().includes(query.toLowerCase())
    );
    // Update the leads state with the filtered results
  setFilteredLeads(filteredLeads);
  setSearchQuery(query);
  };

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
    const fetchLeads = async () => {
      try {
        const response = await fetch("http://localhost:5555/leads");
        if (response.ok) {
          const data = await response.json();
          setLeads(data);
          setFilteredLeads(data); // Set filteredLeads initially to all leads
          setIsLoadingLeads(false);
        } else {
          console.error("Error fetching leads:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
        setIsLoadingLeads(false);
      }
    };

    const timer = setTimeout(() => {
      fetchLeads();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-70px",
          }}
        >
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            leads={leads}
            setFilteredLeads={setFilteredLeads}
          />
        </div>
      )}
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
                {filteredLeads.map((lead) => (
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


export default LeadsTable;
