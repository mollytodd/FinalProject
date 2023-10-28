import React from "react";
import { Button, Heading, Flex, Box } from "@chakra-ui/react";
import Logout from "./Logout";
import PieChart from "./PieChart";

function Home({ setUser, leadData, setLeadData }) {
  return (
    <Flex flexDirection="column" alignItems="center" p={4}>
      <Button
        as="a"
        display={{ base: "none", md: "inline-flex" }}
        fontSize="sm"
        fontWeight="600"
        position="fixed"
        top="1rem"
        right="1rem"
        color="white"
        bg="blue.500"
        href="#"
        _hover={{
          bg: "blue.500",
        }}
      >
        <Logout setUser={setUser} />
      </Button>
      <Box mt={8} textAlign="center">
        <Heading as="h2" size="xl">
          Welcome to Your Lead Dashboard
        </Heading>
      </Box>
      <Box mt={8}>
        <PieChart />
      </Box>
    </Flex>
  );
}

export default Home;
