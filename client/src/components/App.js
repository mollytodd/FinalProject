import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./Login";
import Home from "./Home";
// import Sidebar from "./Sidebar";
import { AuthProvider } from "./AuthContext";
import LeadsTable from "./LeadsTable";
import AddLeadPage from "./AddLeadPage";
import Notifications from "./Notifications";

function App() {
  const [user, setUser] = useState(null);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalWonLeads, setTotalWonLeads] = useState(0);
  const [totalLostLeads, setTotalLostLeads] = useState(0);
  const [topSources, setTopSources] = useState([]); 
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Fetch your lead data and calculate the values
    fetch("http://localhost:5555/leads")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Network response was not ok");
        }
      })
      .then((data) => {
        const totalLeads = data.length;
        const totalWonLeads = data.filter(
          (lead) => lead.stage === "Won"
        ).length;
        const totalLostLeads = data.filter(
          (lead) => lead.stage === "Lost"
        ).length;

        setTotalLeads(totalLeads);
        setTotalWonLeads(totalWonLeads);
        setTotalLostLeads(totalLostLeads);
      })
      .catch((error) => {
        console.error("Error fetching lead data:", error);
      });
  }, []);

  const fetchUser = () =>
    fetch("http://localhost:5555/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          console.log(user);
        });
      }
    });

  return (
    <AuthProvider>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route path="/login">
              <Login user={user} setUser={setUser} fetchUser={fetchUser} />
            </Route>

            <Route path="/home">
              <Home
                setUser={setUser}
                totalLeads={totalLeads}
                totalWonLeads={totalWonLeads}
                totalLostLeads={totalLostLeads}
                topSources={topSources}
                setFilteredLeads={setFilteredLeads}
              />
            </Route>
            <Route path="/leads">
              <LeadsTable
                leads={leads}
                setLeads={setLeads}
                filteredLeads={filteredLeads}
                setFilteredLeads={setFilteredLeads}
              />
            </Route>
            <Route
              path="/leads/:leadType"
              render={(props) => (
                <LeadsTable {...props} leads={leads} setLeads={setLeads} />
              )}
            />

            <Route path="/add-lead">
              <AddLeadPage  />
            </Route>
            {/* <Route path="/notifications" component={Notifications} /> */}
            <Redirect from="/" to="/login" />
          </Switch>
        </Router>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
