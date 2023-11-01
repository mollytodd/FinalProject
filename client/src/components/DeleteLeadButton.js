import React from "react";
import { Button } from "@chakra-ui/react";

function DeleteLeadButton({ onDeleteLead, leadId }) {
   const handleDelete = () => {
     onDeleteLead(leadId);
   };
  return (
    <Button colorScheme="red" onClick={handleDelete}>
      Delete
    </Button>
  );
}

export default DeleteLeadButton;
