import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import LeadForm from "./LeadForm";
import DeleteLeadButton from "./DeleteLeadButton";
import Loading from "./Loading";
import * as XLSX from "xlsx";
import SearchBar from "./SearchBar";
import EditLeadButton from "./EditLeadButton";
import EditLeadModal from "./EditLeadModal";

const LeadsTable = ({ handleSubmit }) => {
  const [leads, setLeads] = useState([]);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Add isEditing state
  const [editingLead, setEditingLead] = useState(null);

  // Initialize filteredLeads state here
  const history = useHistory();

  const exportToExcel = () => {
    const data = [
      ["NAME", "Phone Number", "Lead Type", "Stage", "Notes"],
      ...filteredLeads.map((lead) => [
        lead.lead_name,
        lead.phone_number,
        lead.lead_type,
        lead.stage,
        lead.notes,
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");

    XLSX.writeFile(wb, "leads.xlsx"); // Trigger the download
  };

  const handleEdit = (leadId) => {
    // Find the lead to edit by leadId
    const leadToEdit = leads.find((lead) => lead.lead_id === leadId);

    setEditingLead(leadToEdit); // Store the lead data being edited
    setIsEditing(true); // Show the edit modal
  };

  const handleSaveEdit = (editedLeadData) => {
    // Make a request to update the lead data in your backend
    // Example: You can use fetch or another HTTP client

    // After a successful update in the backend, update the state
    const updatedLeads = leads.map((lead) => {
      if (lead.lead_id === editedLeadData.lead_id) {
        return { ...lead, ...editedLeadData };
      } else {
        return lead;
      }
    });

    setLeads(updatedLeads); // Update the leads in your state
    setEditingLead(null); // Clear the editingLead state
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

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <Button colorScheme="twitter" size="sm" onClick={navigateToHome}>
          Back to Home
        </Button>
        <SearchBar leads={leads} setFilteredLeads={setFilteredLeads} />
        <Button
          colorScheme="orange"
          size="sm"
          onClick={() => history.push("/add-lead")}
        >
          Add New Lead
        </Button>
        <Button colorScheme="green" size="sm" onClick={exportToExcel}>
          Export to Excel
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
            marginTop: "-20px",
          }}
        ></div>
      )}
      {isAddingLead ? (
        <LeadForm onAddLead={handleAddLead} />
      ) : (
        <Table variant="striped" colorScheme="black">
          <Thead>
            <Tr>
              <Th>NAME</Th>
              <Th>Phone Number</Th>
              <Th>Email</Th>
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
                <Td>{lead.email}</Td>
                <Td>{lead.lead_type}</Td>
                <Td>{lead.stage}</Td>
                <Td>{lead.notes}</Td>
                <Td>
                  <EditLeadButton onClick={() => handleEdit(lead.lead_id)} />

                  <DeleteLeadButton
                    onDeleteLead={() => handleDelete(lead.lead_id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {isEditing && (
        <EditLeadModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          lead={editingLead}
          onSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default LeadsTable;
