import React from "react";
import { Box, Flex, Text, Heading, Center } from "@chakra-ui/react";
import { FaChartPie, FaChartBar, FaChartLine } from "react-icons/fa"; // Import the desired icons

const SummaryBoxes = ({ totalLeads, totalWonLeads, totalLostLeads }) => {
  const boxStyles = {
    width: "300px",
    height: "200px",
    borderRadius: "20px",
    p: 4,
    boxShadow: "lg",
    margin: "10px",
    textAlign: "center",
    color: "white", // Make the emojis white
   
  };

  const numberStyles = {
    fontSize: "65px", // Increase the font size of the numbers
    color: "black", // Make the numbers black
  };

  const emojiStyles = {
    fontSize: "80px", // Increase the font size of the emojis
    color: "white", // Make the emojis white
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Center the icons
  };

  const textStyles = {
    color: "black", // Make the text elements black
  };

  const gradientBackgroundPurple = {
    background: "linear-gradient(to bottom, violet, white)", // Lighter purple to white
  };

  const gradientBackgroundBlue = {
    background: "linear-gradient(to bottom, lightblue, white)", // Light blue to white
  };

  const gradientBackgroundRed = {
    background: "linear-gradient(white)", // Gradient background for "Lost"
  };

  return (
    <Flex justify="space-around" p={4}>
      <Center>
        <Box
          {...boxStyles}
          style={gradientBackgroundPurple} // Apply the gradient background
        >
          <Flex direction="column" alignItems="center">
            <Text style={textStyles}>Total</Text>
            <Text style={emojiStyles}>
              <FaChartPie /> {/* Pie chart icon */}
            </Text>
            <Heading style={numberStyles}>{totalLeads}</Heading>
          </Flex>
        </Box>
      </Center>
      <Center>
        <Box
          {...boxStyles}
          style={gradientBackgroundBlue} // Apply the gradient background
        >
          <Flex direction="column" alignItems="center">
            <Text style={textStyles}>Won</Text>
            <Text style={emojiStyles}>
              <FaChartBar /> {/* Bar graph icon */}
            </Text>
            <Heading style={numberStyles}>{totalWonLeads}</Heading>
          </Flex>
        </Box>
      </Center>
      <Center>
        <Box
          {...boxStyles}
          style={gradientBackgroundRed} // Apply the gradient background
        >
          <Flex direction="column" alignItems="center">
            <Text style={textStyles}>Lost</Text>
            <Text style={emojiStyles}>
              <FaChartLine /> {/* Line graph icon */}
            </Text>
            <Heading style={numberStyles}>{totalLostLeads}</Heading>
          </Flex>
        </Box>
      </Center>
    </Flex>
  );
};

export default SummaryBoxes;
