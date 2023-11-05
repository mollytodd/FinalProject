import React from "react";
import { Box } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      <Box
        w="50px"
        h="50px"
        borderWidth="2px"
        borderColor="blue.500"
        borderTopColor="transparent"
        borderRightColor="transparent"
        animation="spin 1s linear infinite"
      />
      <Box mt={4}>Just a second......</Box>
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Loading;
