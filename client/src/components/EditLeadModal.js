import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

function EditLeadModal({ isOpen, onClose, lead, onSaveEdit }) {
  const [editedLead, setEditedLead] = useState({ ...lead });

  function getIdFromName(name) {
    const idMap = {
      Won: 1,
      Lost: 2,
      Qualifying: 3,
      Negotiating: 4,
      "On Hold": 5,
      Proposal: 6,
      "New Lead": 7,
      Disqualified: 8,
    };

    return idMap[name];
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedLead((prevLead) => ({
      ...prevLead,
      [name]: name === "lead_type" ? [value] : value,
    }));
  };

  const handleSave = async () => {
    const leadStageId = getIdFromName(editedLead.stage);
    const updatedLead = { ...editedLead, stage: leadStageId };
    delete updatedLead.lead_type;

    const leadData = JSON.stringify(updatedLead);

    // Define the base URL and path separately


    try {
      const response = await fetch(`/leads/${updatedLead.lead_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: leadData,
      });

      console.log("Response:", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data:", data);

      onSaveEdit(data);
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Lead</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="lead_name"
              value={editedLead.lead_name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              name="phone_number"
              value={editedLead.phone_number}
              onChange={handleInputChange}
            />
            {/* Additional field for email */}
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={editedLead.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl></FormControl>
          <FormControl>
            <FormLabel>Stage</FormLabel>
            <Input
              name="stage"
              value={editedLead.stage}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Notes</FormLabel>
            <Input
              name="notes"
              value={editedLead.notes}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
          <Button colorScheme="gray" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditLeadModal;
