import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const EditLeadForm = ({

  onUpdateLead,
  onCancelEdit,
  lead,
  isEditModalOpen,
  setIsEditModalOpen,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  

  const handleEditClick = () => {
   
    setIsEditModalOpen(true);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    onUpdateLead(lead.lead_id, values);
    setIsEditing(false);
    setSubmitting(false);
    setIsEditModalOpen(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    onCancelEdit(); // Use onCancelEdit here
    setIsEditModalOpen(false);
  };

  return (
    <Box>
      <Flex>
        <Button colorScheme="teal" size="sm" onClick={handleEditClick}>
          Edit
        </Button>
      </Flex>

      <Modal isOpen={isEditModalOpen} onClose={handleCancelClick}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Lead</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              enableReinitialize
              initialValues={lead}
              onSubmit={handleSubmit}
            >
              <Form>
                <Field name="lead_name">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input {...field} />
                    </FormControl>
                  )}
                </Field>

                <Field name="email">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input {...field} />
                    </FormControl>
                  )}
                </Field>

                <Field name="phone_number">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel>Phone Number</FormLabel>
                      <Input {...field} />
                    </FormControl>
                  )}
                </Field>

                <Field name="stage">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel>Lead Stage</FormLabel>
                      <Select {...field} value={field.value || ""}>
                        <option value="New Lead">New Lead</option>
                      </Select>
                    </FormControl>
                  )}
                </Field>

                <Field name="notes">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel>Notes</FormLabel>
                      <Input {...field} />
                    </FormControl>
                  )}
                </Field>

                <Field name="lead_type">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel>Lead Type</FormLabel>
                      <Select {...field} value={field.value || ""}>
                        <option value="Google">Google</option>
                      </Select>
                    </FormControl>
                  )}
                </Field>

                <Button type="submit" colorScheme="blue" mt="4">
                  Save
                </Button>
                <Button
                  type="button"
                  colorScheme="red"
                  mt="4"
                  ml="2"
                  onClick={onCancelEdit}
                >
                  Cancel
                </Button>
              </Form>
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditLeadForm;
