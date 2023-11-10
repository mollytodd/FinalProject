import React from "react";
import { Box, Text, VStack, Badge, Icon } from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai"; // Import an icon from the desired icon library

const TopLeadSources = ({ topSources }) => {
  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Your Top Sources:
      </Text>
      <VStack spacing={4} align="start">
        {topSources.map((source, index) => (
          <Badge
            key={index}
            colorScheme="teal"
            fontSize="xl" // Customize the badge text size
            display="flex"
            alignItems="center"
          >
            <Icon as={AiFillStar} mr={2} /> {source.leadType}
          </Badge>
        ))}
      </VStack>
    </Box>
  );
};

export default TopLeadSources;
