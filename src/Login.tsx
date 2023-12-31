import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useViewNavigate } from "./hooks/useViewNavigate";
import { ORDERS_PAGE_INFO } from "./routeStrings";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const viewNavigate = useViewNavigate();

  const handleLogin = () => {
    viewNavigate(ORDERS_PAGE_INFO);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Log In
      </Button>
    </Box>
  );
};

export { Login };
