import React from "react";
import {
  Box,
  VStack,
  Link,
  Divider,
  Icon,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaHome, FaUsers, FaPlus, FaBell } from "react-icons/fa";

const Sidebar = ({ newLeads, onOpen }) => {
  const newLeadsCount = newLeads.length; // Get the count of new leads

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
          <Tooltip label="Add Lead" aria-label="Add Lead" placement="right">
            <Link as={RouterLink} to="/add-lead">
              <Icon as={FaPlus} w={6} h={6} />
              {newLeadsCount > 0 && (
                <Text
                  bg="red"
                  color="white"
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="bold"
                  px="2"
                  py="1"
                  position="absolute"
                  top="140px" // Decrease this value
                  right="7px" // Decrease this value
                >
                  {newLeadsCount}
                </Text>
              )}
            </Link>
          </Tooltip>
          <Tooltip
            
            aria-label="Notifications"
            placement="right"
          >
            <Icon as={FaBell} w={6} h={6} onClick={onOpen} />
          </Tooltip>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;
