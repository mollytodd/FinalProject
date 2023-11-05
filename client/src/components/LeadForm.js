import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

function LeadForm({ onAddLead }) {
const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    console.log("Form values before submission:", values);

    // Make a POST request to your API endpoint
    const response = await fetch("/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      // Call the onAddLead function if the API request was successful
      onAddLead(values);

      console.log("Form values after successful submission:", values);

      setSubmitting(false);
      resetForm();
    } else {
      console.error("API request failed");
    }
  } catch (error) {
    console.error("Error while making API request:", error);
  }
};
  return (
    <Box>
      <Heading fontSize="4xl" mb="4">
        Add a New Lead
      </Heading>
      <Formik
        enableReinitialize
        initialValues={{
          lead_name: "",
          email: "",
          phone_number: "",
          notes: "",
          stage: "",
          lead_type: "",
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
                  <option value="TikTok">TikTok</option>
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
