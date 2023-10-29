import React from "react";
import { Button, Heading, Flex, Box, SimpleGrid } from "@chakra-ui/react";
import Logout from "./Logout";
import PieChart from "./PieChart";
import Sidebar from "./Sidebar";
import BarChart from "./BarChart";
import SummaryBoxes from "./SummaryBoxes";

function Home({
  setUser,
  leadData,
  setLeadDatatotalLeads,
  totalWonLeads,
  totalLostLeads,
  totalLeads,
}) {
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
          Your Lead Dashboard
        </Heading>
      </Box>
      <Box mt={8}>
        <SimpleGrid spacing={10}>
          <SummaryBoxes
            totalLeads={totalLeads}
            totalWonLeads={totalWonLeads}
            totalLostLeads={totalLostLeads}
          />
          <div style={{ display: "flex" }}>
            <PieChart />
            <BarChart />
          </div>
        </SimpleGrid>
        <Sidebar />
      </Box>
    </Flex>
  );
}

export default Home;
