import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import LeadForm from "./LeadForm";
import DeleteLeadButton from "./DeleteLeadButton";
import Loading from "./Loading";
import * as XLSX from "xlsx";
import SearchBar from "./SearchBar";
import EditLeadButton from "./EditLeadButton";
import EditLeadModal from "./EditLeadModal";

const LeadsTable = ({ leads, setLeads, filteredLeads, setFilteredLeads }) => {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const leadType = pathParts[pathParts.length - 1];

  const [isAddingLead, setIsAddingLead] = useState(false);
  // const [filteredLeads, setFilteredLeads] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [searchFilteredLeads, setSearchFilteredLeads] = useState([]);
  

  console.log("leadType:", leadType);
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
   const leadToEdit = leads.find((lead) => lead.lead_id === leadId);

   if (leadToEdit) {
     setEditingLead(leadToEdit);
     setIsEditing(true);
   } else {
     console.error(`Lead with ID ${leadId} not found.`);
   }
 };
  const handleSaveEdit = (editedLeadData) => {
    const updatedLeads = leads.map((lead) => {
      if (lead.lead_id === editedLeadData.lead_id) {
        return { ...lead, ...editedLeadData };
      } else {
        return lead;
      }
    });

    setLeads(updatedLeads);
    setEditingLead(null);
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
    setIsLoadingData(true);

    try {
      const response = await fetch("http://localhost:5555/leads");
      if (response.ok) {
        const data = await response.json();

        // Check if the route is "/leads", if so, show all leads
        const filteredData =
          location.pathname === "/leads"
            ? data
            : data.filter((lead) => lead.lead_type.includes(leadType));

        setLeads(filteredData);
        setFilteredLeads(filteredData);
      } else {
        console.error("Error fetching leads:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }

    setIsLoadingData(false);
  };

  // Fetch leads when the route changes or leadType changes
  fetchLeads();
}, [
  location.pathname,
  leadType,
  setLeads,
  setFilteredLeads,
  setSearchFilteredLeads,
]);



  const navigateToHome = () => {
    history.push("/home");
  };

  const handleAddLead = (newLead) => {
    setLeads((prevLeads) => [...prevLeads, newLead]);
    setFilteredLeads((prevFilteredLeads) => [...prevFilteredLeads, newLead]);
    setIsAddingLead(false);
  };

//  useEffect(() => {
//    const timer = setTimeout(() => {
//      fetch("http://localhost:5555/leads")
//        .then((response) => response.json())
//        .then((data) => {
//          setLeads(data);
//        })
//        .catch((error) => {
//          console.error("Error fetching leads:", error);
//        });
//    }, 2000);

//    return () => clearTimeout(timer);
//  }, []);

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
        <SearchBar
          leads={leads}
          setSearchFilteredLeads={setSearchFilteredLeads}
        />

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

      {isLoadingData ? (
        <Loading />
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
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchFilteredLeads.length > 0
              ? searchFilteredLeads.map((lead) => (
                  <Tr key={lead.lead_id}>
                    <Td>{lead.lead_name}</Td>
                    <Td>{lead.phone_number}</Td>
                    <Td>{lead.email}</Td>
                    <Td>{lead.lead_type}</Td>
                    <Td>{lead.stage}</Td>
                    <Td>{lead.notes}</Td>
                    <Td>
                      <EditLeadButton
                        onClick={() => handleEdit(lead.lead_id)}
                      />
                      <DeleteLeadButton
                        onDeleteLead={() => handleDelete(lead.lead_id)}
                      />
                    </Td>
                  </Tr>
                ))
              : leads.map((lead) => (
                  <Tr key={lead.lead_id}>
                    <Td>{lead.lead_name}</Td>
                    <Td>{lead.phone_number}</Td>
                    <Td>{lead.email}</Td>
                    <Td>{lead.lead_type}</Td>
                    <Td>{lead.stage}</Td>
                    <Td>{lead.notes}</Td>
                    <Td>
                      <EditLeadButton
                        onClick={() => handleEdit(lead.lead_id)}
                      />
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
