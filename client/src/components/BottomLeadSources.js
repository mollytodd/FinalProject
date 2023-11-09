import React from "react";
import { Box, Text, VStack, Badge, Icon } from "@chakra-ui/react";
import { AiOutlineStar } from "react-icons/ai"; // Import an icon from the desired icon library

const BottomLeadSources = ({ bottomSources }) => {
  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Your Bottom Sources:
      </Text>
      <VStack spacing={4} align="start">
        {bottomSources.map((source, index) => (
          <Badge
            key={index}
            colorScheme="red" // Customize the color for bottom sources
            fontSize="xl" // Customize the badge text size
            display="flex"
            alignItems="center"
          >
            <Icon as={AiOutlineStar} mr={2} /> {source.leadType}
          </Badge>
        ))}
      </VStack>
    </Box>
  );
};

export default BottomLeadSources;
