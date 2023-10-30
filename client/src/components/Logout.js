import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the useAuth hook

export default function Logout() {
  const history = useHistory();
  const { setUser } = useAuth(); // Access the setUser method

  function handleLogOut() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        // Use setUser method from the context to set the user to null
        setUser(null);
        history.push("/");
      }
    });
  }

  return <button onClick={handleLogOut}>Logout</button>;
}
