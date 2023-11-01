import React, {useEffect, useState} from "react";
import { Button, Heading, Flex, Box, SimpleGrid } from "@chakra-ui/react";
import Logout from "./Logout";
import PieChart from "./PieChart";
import Sidebar from "./Sidebar";
import BarChart from "./BarChart";
import SummaryBoxes from "./SummaryBoxes";
import Loading from "./Loading";
import TodoDropdown from "./TodoDropdown";
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
          
          
            <TodoDropdown />
         
          <Box mt={8} textAlign="center">
            <Heading as="h2" size="xl">
              Your Lead Dashboard
            </Heading>
          </Box>
          <Box mt={8}>
            <SimpleGrid spacing={10}>
              <SummaryBoxes
                totalLeads={totalLeads}
                totalWonLeads={totalWonLeads}
                totalLostLeads={totalLostLeads}
              />
              <div style={{ display: "flex" }}>
                <PieChart />
                <BarChart />
              </div>
            </SimpleGrid>
            <Sidebar />
          </Box>
        </>
      )}
    </Flex>
  );
}

export default Home;