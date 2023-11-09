import React, {useEffect, useState} from "react";
import { Button, Flex, Box, Text } from "@chakra-ui/react";
import Logout from "./Logout";
import PieChart from "./PieChart";
import Sidebar from "./Sidebar";
import BarChart from "./BarChart";
// import ScatterPlot from "./ScatterPlot";
import SummaryBoxes from "./SummaryBoxes";
import Loading from "./Loading";
import TopLeadSources from "./TopLeadSources";
import BottomLeadSources from "./BottomLeadSources";
import HomeHeader from "./HomeHeader";
import Notifications from "./Notifications";
import TipOfTheDay from "./TipOfTheDay";
import { useAuth } from "./AuthContext"; 




function Home({
  leadData,
  setLeadDatatotalLeads,
  totalWonLeads,
  totalLostLeads,
  totalLeads,
  newLeadsCount,

}) {
  const { setUser } = useAuth(); // Access setUser method
  const [loading, setLoading] = useState(true);
  const [bottomSources, setBottomSources] = useState([]);
  const [topSources, setTopSources] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newLeads, setNewLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);

   useEffect(() => {
     // Fetch new leads data from your API
     fetch("http://localhost:5555/leads/stage/7") // Use the full URL to your API
       .then((response) => response.json())
       .then((data) => {
         setNewLeads(data); // Update the newLeads state
         setTimeout(() => {
           setLoading(false);
         }, 2000); // Display Loading for at least 2 seconds
       })
       .catch((error) => {
         console.error("Error fetching new leads: ", error);
         setLoading(false);
       });
   }, []);

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
            bg="twitter.500" // Use Twitter blue color
            zIndex={1}
            href="#"
            _hover={{
              bg: "twitter.600", // Adjust the hover color if needed
            }}
          >
            <Logout setUser={setUser} />
          </Button>
          <HomeHeader />
          <TipOfTheDay topSources={topSources} bottomSources={bottomSources} />

          <Box mt={6} marginLeft="px">
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
                textAlign="center"
                margin="0 30px 0 0"
                boxShadow="0 4px 8px rgba(0, 0, 0, 0.6)"
                // Remove border style
              >
                <Text fontWeight="bold" fontSize="lg" mb={2}>
                  Type Breakdown
                </Text>
                <PieChart
                  setTopSources={setTopSources}
                  setBottomSources={setBottomSources}
                  setFilteredLeads={setFilteredLeads}
                />
              </Box>

              <Box
                p={4}
                bgColor="white"
                borderRadius="lg"
                border="1px solid gray.300"
                boxShadow="0 4px 8px rgba(0, 0, 0, 0.6)"
                margin="0 30px 0 0"
              >
                {topSources ? (
                  <TopLeadSources topSources={topSources} />
                ) : (
                  <p>No lead sources data available.</p>
                )}
              </Box>
              {/* Add BottomLeadSources component here */}
              <Box
                p={4}
                bgColor="white"
                borderRadius="lg"
                border="1px solid gray.300"
                boxShadow="0 4px 8px rgba(0, 0, 0, 0.6)"
                margin="0 30px 0 0"
              >
                {bottomSources ? (
                  <BottomLeadSources bottomSources={bottomSources} />
                ) : (
                  <p>No bottom lead sources data available.</p>
                )}
              </Box>

              <Box
                p={4}
                bgColor="white"
                borderRadius="lg"
                // Remove border style
                textAlign="center"
                border="1px solid gray.300"
                boxShadow="0 4px 8px rgba(0, 0, 0, 0.6)"

                // Remove border style
              >
                <Text fontWeight="bold" fontSize="lg" mb={2}>
                  Stage Breakdown
                </Text>
                <BarChart />
              </Box>
            </Flex>
          </Box>

          <Sidebar
            newLeads={newLeads}
            isOpen={isOpen}
            onOpen={() => setIsOpen(true)}
          />
          <Notifications
            newLeads={newLeads}
            isOpen={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
          />
        </>
      )}
    </Flex>
  );
}

export default Home;