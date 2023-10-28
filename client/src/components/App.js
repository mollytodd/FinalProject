
import React, { useState } from "react";
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
// import MyProvider from "./MyProvider"; // Check the path
import Login from "./Login"; // Check the path
import Home from "./Home";

function App() {
  const [user, setUser] = useState(null);
  // const [refreshPage, setRefreshPage] = useState(false);

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
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <Login user={user} setUser={setUser} fetchUser={fetchUser} />
          </Route>
          <Route path="/home">
            <Home setUser={setUser} />
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;



