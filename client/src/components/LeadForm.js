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
import { motion } from "framer-motion"; // Import animation library
import { useHistory } from "react-router-dom";

function LeadForm({ onAddLead }) {
  const history = useHistory();
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
       history.push("/leads");
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
    <Box
      p={4}
      borderRadius="md"
      boxShadow="lg"
      bg="white"
      maxWidth="400px"
      m="auto"
    >
      <Heading as="h2" size="xl" mb={4}>
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
        {({ values, setFieldValue }) => (
          <Form>
            <Field name="lead_name">
              {({ field }) => (
                <FormControl mb={4}>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} placeholder="Enter Name" />
                </FormControl>
              )}
            </Field>

            <Field name="email">
              {({ field }) => (
                <FormControl mb={4}>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} type="email" placeholder="Enter Email" />
                </FormControl>
              )}
            </Field>

            <Field name="phone_number">
              {({ field }) => (
                <FormControl mb={4}>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="Enter Phone Number"
                  />
                </FormControl>
              )}
            </Field>

            <Field name="stage">
              {({ field }) => (
                <FormControl mb={4}>
                  <FormLabel>Lead Stage</FormLabel>
                  <Select
                    {...field}
                    placeholder="Select a Stage"
                    onChange={(e) => setFieldValue("stage", e.target.value)}
                  >
                    <option value="New Lead">New Lead</option>
                    <option value="Qualifying">Qualifying</option>
                    <option value="Negotiating">Negotiating</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                    <option value="Disqualified">Disqualified</option>
                  </Select>
                </FormControl>
              )}
            </Field>

            <Field name="notes">
              {({ field }) => (
                <FormControl mb={4}>
                  <FormLabel>Notes</FormLabel>
                  <Input {...field} placeholder="Enter Notes" />
                </FormControl>
              )}
            </Field>

            <Field name="lead_type">
              {({ field }) => (
                <FormControl mb={4}>
                  <FormLabel>Lead Type</FormLabel>
                  <Select
                    {...field}
                    placeholder="Select a Lead Type"
                    onChange={(e) => setFieldValue("lead_type", e.target.value)}
                  >
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

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button type="submit" colorScheme="blue" mt={4}>
                Add Lead
              </Button>
            </motion.div>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default LeadForm;
