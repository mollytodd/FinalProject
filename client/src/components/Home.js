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
import HomeHeader from "./HomeHeader";
import Notifications from "./Notifications";

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
         setLoading(false);
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
            bg="black"
            zIndex={1}
            href="#"
            _hover={{
              bg: "black",
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
                <PieChart
                  setTopSources={setTopSources}
                  setFilteredLeads={setFilteredLeads}
                />
              </Box>
              <Box p={4} bgColor="white" borderRadius="lg">
                {topSources ? (
                  <TopLeadSources topSources={topSources} />
                ) : (
                  <p>No lead sources data available.</p>
                )}
              </Box>

              <Box
                p={4}
                bgColor="white"
                borderRadius="lg"
                // Remove border style
              >
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