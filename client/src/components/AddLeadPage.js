import React from "react";
import { useHistory } from "react-router-dom";
import LeadForm from "./LeadForm";
import { Image, Box, Flex, Button } from "@chakra-ui/react";

function AddLeadPage() {
  const history = useHistory();

  const navigateToHome = () => {
    history.push("/home");
  };

  return (
    <Box
      p={4}
      borderRadius="md"
      boxShadow="lg"
      bg="gray.200"
      maxWidth="900px"
      m="auto"
      mt={8}
    >
      <Button
        colorScheme="twitter"
        size="sm"
        onClick={navigateToHome}
        position="absolute"
        top="-10px"
        left="10px"
      >
        Back to Home
      </Button>
      <Flex>
        <Image
          src="https://tashheer.com/wp-content/uploads/2021/11/leads_generation.jpg"
          alt="Lead Image"
          maxH="600px"
          mx="auto"
        />
        <LeadForm />
      </Flex>
    </Box>
  );
}

export default AddLeadPage;
