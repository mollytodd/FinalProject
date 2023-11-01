import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react"


function LeadForm({ onAddLead }) {
  const handleSubmit = (values, { resetForm }) => {
    // Call the onAddLead function to add the new lead
    onAddLead(values);
    resetForm();
  };

  return (
    <Box>
      <Heading fontSize="4xl" mb="4">
        Add a New Lead
      </Heading>
      <Formik
        initialValues={{
          lead_name: "",
          email: "",
          phone_number: "",
          notes: "",
          stage_name: "",
          type_names: "", // Use a single field for lead type
        }}
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
                <Input {...field} />
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
                <Select {...field}>
                  <option value="" disabled hidden>
                    Select a lead type
                  </option>
                  <option value="Google">Google</option>
                  <option value="Yelp">Yelp</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Flyer">Flyer</option>
                  <option value="Walk By">Walk By</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
            )}
          </Field>
          <Button type="submit" colorScheme="blue" mt="4">
            Add Lead
          </Button>
        </Form>
      </Formik>
    </Box>
  );
}

export default LeadForm;
