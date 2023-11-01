import React, { useState, useEffect } from "react";
import { Box, Text, Button, Input, Flex, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const TodoDropdown = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Load to-do list items from local storage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save to-do list items to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <Box
      position="absolute"
      top="9rem"
      right="1rem"
      backgroundColor="white"
      boxShadow="lg"
      p={4}
      borderRadius="md"
      width="300px" // Set the width to make the to-do list wider
    >
      <Flex alignItems="center">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Tasks"
          size="md"
          fontSize="md"
          width="70%" // Set the width of the input
        />
        <IconButton
          icon={<AddIcon />}
          colorScheme="blue"
          onClick={addTodo}
          ml={2}
        />
      </Flex>
      {todos.map((todo, index) => (
        <Flex key={index} justifyContent="space-between" mt={2}>
          <Text>{todo}</Text>
          <Button size="sm" colorScheme="red" onClick={() => removeTodo(index)}>
            Remove
          </Button>
        </Flex>
      ))}
    </Box>
  );
};

export default TodoDropdown;
