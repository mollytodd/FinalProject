import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function Notifications({ newLeads, isOpen, onClose }) {


  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Leads Notifications</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {(newLeads || []).length > 0 ? ( // Check if newLeads is defined before accessing its length property
              <ul>
                {newLeads.map((lead) => (
                  <li key={lead.lead_id}>
                    {lead.lead_name} - {lead.email}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No new leads.</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Notifications