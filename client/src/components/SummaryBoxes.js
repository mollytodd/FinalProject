import React from "react";
import { Box, Flex, Text, Heading, Center } from "@chakra-ui/react";

const SummaryBoxes = ({ totalLeads, totalWonLeads, totalLostLeads }) => {
  return (
    <Flex justify="space-around" p={4}>
      <Center>
        <Box p={4} boxShadow="lg">
          <Text>Total Leads</Text>
          <Heading>{totalLeads}</Heading>
        </Box>
      </Center>
      <Center>
        <Box p={4} boxShadow="lg">
          <Text>Won Leads</Text>
          <Heading>{totalWonLeads}</Heading>
        </Box>
      </Center>
      <Center>
        <Box p={4} boxShadow="lg">
          <Text>Lost Leads</Text>
          <Heading>{totalLostLeads}</Heading>
        </Box>
      </Center>
    </Flex>
  );
};

export default SummaryBoxes;
