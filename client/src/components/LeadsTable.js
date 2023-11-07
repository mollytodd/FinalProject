import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import LeadForm from "./LeadForm";
import DeleteLeadButton from "./DeleteLeadButton";
import Loading from "./Loading";
import EditLeadForm from "./EditLeadForm";
import SearchBar from "./SearchBar";




const LeadsTable = ({ handleSubmit }) => {
  const [leads, setLeads] = useState([]);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  const [filteredLeads, setFilteredLeads] = useState([]); // Initialize filteredLeads state here
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Moved here
  const [selectedLead, setSelectedLead] = useState(null); // Moved here
  const history = useHistory();

  const handleUpdateLead = (leadId, updatedData) => {
    fetch(`http://localhost:5555/leads/${leadId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          const updatedLeads = leads.map((lead) =>
            lead.lead_id === leadId ? { ...lead, ...updatedData } : lead
          );
          setLeads(updatedLeads);
        } else {
          console.error("Error updating lead:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error updating lead:", error);
      });
  };

 

  const handleDelete = (leadId) => {
    fetch(`http://localhost:5555/leads/${leadId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedLeads = leads.filter((lead) => lead.lead_id !== leadId);
          const updatedFilteredLeads = filteredLeads.filter(
            (lead) => lead.lead_id !== leadId
          );
          setLeads(updatedLeads);
          setFilteredLeads(updatedFilteredLeads);
        } else {
          console.error("Error deleting lead:", response.statusText);
          // Update the state even if the deletion fails
          const updatedLeads = leads.filter((lead) => lead.lead_id !== leadId);
          const updatedFilteredLeads = filteredLeads.filter(
            (lead) => lead.lead_id !== leadId
          );
          setLeads(updatedLeads);
          setFilteredLeads(updatedFilteredLeads);
        }
      })
      .catch((error) => {
        console.error("Error deleting lead:", error);
        // Update the state even if the deletion fails
        const updatedLeads = leads.filter((lead) => lead.lead_id !== leadId);
        const updatedFilteredLeads = filteredLeads.filter(
          (lead) => lead.lead_id !== leadId
        );
        setLeads(updatedLeads);
        setFilteredLeads(updatedFilteredLeads);
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
    setFilteredLeads((prevFilteredLeads) => [...prevFilteredLeads, newLead]);
    setIsAddingLead(false); // Set isAddingLead to false after adding the lead
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

  const handleCancelEdit = () => {
  setIsEditModalOpen(false);
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

      <SearchBar leads={leads} setFilteredLeads={setFilteredLeads} />

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
        ></div>
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
              <Th>Actions</Th> {/* Added a column for actions */}
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
                    onDeleteLead={() => handleDelete(lead.lead_id)}
                  />
                  <EditLeadForm
                    lead={lead}
                    onUpdateLead={(updatedData) =>
                      handleUpdateLead(lead.lead_id, updatedData)
                    }
                  />{" "}
                  {/* Added EdieadForm */}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Lead</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedLead && (
              <EditLeadForm
                lead={selectedLead}
                onUpdateLead={handleUpdateLead}
                onCancelEdit={handleCancelEdit}
                isEditModalOpen={isEditModalOpen} // Pass the state
                setIsEditModalOpen={setIsEditModalOpen} // Pass the state setter
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LeadsTable;
