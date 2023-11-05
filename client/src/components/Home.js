import React, {useEffect, useState} from "react";
import { Button, Flex, Box, Text } from "@chakra-ui/react";
import Logout from "./Logout";
import PieChart from "./PieChart";
import Sidebar from "./Sidebar";
import BarChart from "./BarChart";
// import ScatterPlot from "./ScatterPlot";
import SummaryBoxes from "./SummaryBoxes";
import Loading from "./Loading";
import TodoDropdown from "./TodoDropdown";
import HomeHeader from "./HomeHeader";

import { useAuth } from "./AuthContext"; 




function Home({
  leadData,
  setLeadDatatotalLeads,
  totalWonLeads,
  totalLostLeads,
  totalLeads,
}) {
  const { setUser } = useAuth(); // Access setUser method
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay before rendering the Home component
    setTimeout(() => {
      setLoading(false); // Content is now ready
    }, 3000); // Adjust the delay time as needed
  }, []);

  return (
    <Flex flexDirection="column" alignItems="center" p={4}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Button
            as="a"
            display={{ base: "none", md: "inline-flex" }}
            fontSize="sm"
            fontWeight="600"
            position="fixed"
            top="1rem"
            right="1rem"
            color="white"
            bg="blue.500"
            zIndex={1}
            href="#"
            _hover={{
              bg: "blue.500",
            }}
          >
            <Logout setUser={setUser} />
          </Button>
          <HomeHeader />

          <Box mt={6} marginLeft="-250px">
            {/* <TodoDropdown /> */}
            <SummaryBoxes
              totalLeads={totalLeads}
              totalWonLeads={totalWonLeads}
              totalLostLeads={totalLostLeads}
            />
            <Flex flexDirection="row">
              <Box
                p={4}
                bgColor="white"
                borderRadius="lg"
                // Remove border style
              >
                <Text align="center" fontSize="lg" fontWeight="light" mb={4}>
                  Lead type %
                </Text>
                <PieChart />
              </Box>
              <Box
                p={4}
                bgColor="white"
                borderRadius="lg"
                // Remove border style
              >
                <Text align="center" fontSize="lg" fontWeight="light" mb={4}>
                  Lead Stage Counts
                </Text>
                <BarChart />
              </Box>
            </Flex>
          </Box>

          <Sidebar />
        </>
      )}
    </Flex>
  );
}

export default Home;






