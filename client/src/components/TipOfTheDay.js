// TipOfTheDay.js

import React from "react";
import { Box, Text } from "@chakra-ui/react";

const TipOfTheDay = ({ topSources, bottomSources }) => {
  const renderTip = () => {
    if (topSources.length > 0 && bottomSources.length > 0) {
      const topSource = topSources[0].leadType;
      const bottomSource = bottomSources[bottomSources.length - 1].leadType;

      return (
        <Box
          bgColor="yellow"
          p={4}
          borderRadius="xl" // Increase the border radius for more round edges
          mt={4}
          position="relative"
        >
          <Text fontWeight="bold" fontSize="md">
            <span
              role="img"
              aria-label="light bulb"
              style={{ marginRight: "8px" }}
            >
              💡
            </span>
            Tip of the Day:
          </Text>
          <Text>
            Consider decreasing your <strong>{bottomSource}</strong> spending and 
            investing more into <strong>{topSource}</strong>.
          </Text>
        </Box>
      );
    }

    return null;
  };

  return <>{renderTip()}</>;
};

export default TipOfTheDay;
