// Sidebar.js
import React from "react";
import { Box, VStack, Link, Divider, Icon, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaHome, FaUsers, FaPlus } from "react-icons/fa"; // Import the FaPlus icon

const Sidebar = () => {
  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      h="100vh"
      w="100px"
      bg="black"
      color="white"
      p="4"
    >
      <VStack spacing="4">
        <Tooltip label="Home" aria-label="Home" placement="right">
          <Link as={RouterLink} to="/home">
            <Icon as={FaHome} w={6} h={6} />
          </Link>
        </Tooltip>
        <Divider />
        <VStack spacing="1" align="flex-start">
          <Tooltip label="Leads" aria-label="Leads" placement="right">
            <Link as={RouterLink} to="/leads">
              <Icon as={FaUsers} w={6} h={6} />
            </Link>
          </Tooltip>
          {/* Add a link to the "Add Lead" route with the FaPlus icon */}
          <Tooltip label="Add Lead" aria-label="Add Lead" placement="right">
            <Link as={RouterLink} to="/add-lead">
              <Icon as={FaPlus} w={6} h={6} />
            </Link>
          </Tooltip>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;
