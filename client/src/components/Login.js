import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the useAuth hook

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const { setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your login logic here

    // Example:
    fetch("http://localhost:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => {
            setUser(user);
            history.push("/home");
          });
        } else {
          response.json().then((data) => {
            setError(data.error || "An error occurred during login.");
          });
        }
      })
      .catch((error) => {
        setError("An error occurred during login.");
      });
  };

  return (
    <Flex flexDirection="row" width="100wh" height="100vh">
      {/* Left Half - Text and Form */}
      <Box
        width="50%"
        backgroundColor="gray.100"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p="2rem"
      >
        <Box mb={8}>
          {" "}
          {/* Add margin-bottom to create spacing */}
          <Avatar bg="blue.400" />
        </Box>
        <Heading color="blue.900" mb={8}>
          Welcome Back.
        </Heading>
        <Box
          backgroundColor="white"
          p="1rem"
          borderRadius="md"
          width="50%" // To ensure the box takes the entire width
        >
          <form onSubmit={handleSubmit}>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText textAlign="right"></FormHelperText>
            </FormControl>
            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="blue"
              width="full"
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>

      <Box
        width="50%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        backgroundColor="white"
      >
        <div>
          <Heading
            color="blue.800"
            size="lg"
            mb={8}
            style={{ marginLeft: "20px" }}
          >
            Transforming Leads Into Success. With LeadPulse You Have:
          </Heading>
          <Stack spacing={8} color="blue.900">
            <Flex alignItems="center" style={{ marginLeft: "20px" }}>
              <span role="img" aria-label="checkmark">
                ✅
              </span>
              <span style={{ marginLeft: "8px" }}>
                A way to categorize and store all leads
              </span>
            </Flex>
            <Flex alignItems="center" style={{ marginLeft: "20px" }}>
              <span role="img" aria-label="checkmark">
                ✅
              </span>
              <span style={{ marginLeft: "8px" }}>Dashboard and Chart breakdowns of leads by source and stage</span>
            </Flex>
            <Flex alignItems="center" style={{ marginLeft: "20px" }}>
              <span role="img" aria-label="checkmark">
                ✅
              </span>
              <span style={{ marginLeft: "8px" }}>
                Customizable to-do lists and reminders to call leads
              </span>
            </Flex>
            <Flex alignItems="center" style={{ marginLeft: "20px" }}>
              <span role="img" aria-label="checkmark">
                ✅
              </span>
              <span style={{ marginLeft: "8px" }}>
                A better way to close business
              </span>
            </Flex>
          </Stack>
        </div>
        <div
          style={{
            width: "100%",
            height: "50%",
            backgroundImage:
              "url(https://engeniusweb.com/wp-content/uploads/2019/09/AdobeStock_583096027-900x600.jpeg)",
            backgroundSize: "cover",
          }}
        ></div>
      </Box>
    </Flex>
  );
};

export default Login;
