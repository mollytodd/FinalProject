import React from "react";
import { Button } from "@chakra-ui/react";

const EditLeadForm = ({ onEditLead, lead }) => {
  const handleEditClick = () => {
    // Call the edit function and pass the lead data
    onEditLead(lead);
  };

  return (
    <Button colorScheme="blue" size="sm" onClick={handleEditClick}>
      Edit
    </Button>
  );
};

export default EditLeadForm;
