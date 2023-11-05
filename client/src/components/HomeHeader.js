import React from "react";
import { Box, Text } from "@chakra-ui/react";

function HomeHeader() {
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      height="100px"
      p={4}
      marginLeft="-900px" // Adjust the margin to move the header further to the left
    >
      <Text fontSize="4xl" fontWeight="light">
        Monitor your lead <br />
        sources and stages
      </Text>
    </Box>
  );
}

export default HomeHeader;
