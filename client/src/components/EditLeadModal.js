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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedLead((prevLead) => ({ ...prevLead, [name]: value }));
  };

  const handleSave = () => {
    // Call the onSaveEdit function to save the edited lead
    onSaveEdit(editedLead);
    onClose();
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
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email" // New field for email
              value={editedLead.email} // Make sure you have this field in your 'editedLead' object
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Lead Type</FormLabel>
            <Input
              name="lead_type"
              value={editedLead.lead_type}
              onChange={handleInputChange}
            />
          </FormControl>
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
