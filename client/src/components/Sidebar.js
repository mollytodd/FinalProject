import React from "react";
import { Box, VStack, Text, Link, Divider } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      h="100vh"
      w="200px"
      bg="blue.500"
      color="white"
      p="4"
    >
      <VStack spacing="4">
        <Text fontSize="1xl" fontWeight="bold">
          LeadPulse
        </Text>
        <Divider />
        <VStack spacing="1" align="flex-start">
          <Link as={RouterLink} to="/home">
            Home
          </Link>
          <Link as={RouterLink} to="/leads">
            Leads
          </Link>
          
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;
