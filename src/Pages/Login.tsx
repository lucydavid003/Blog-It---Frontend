import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import axios from "axios";
import useUser from "../Store.ts/userStore";

interface LoginDetails {
  identifier: string;
  password: string;
}

function Login() {
  const {setUser} = useUser ();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [, setFormError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationKey: ["login user"],
    mutationFn: async (loginDetails: LoginDetails) => {
      const response = await axiosInstance.post("/auth/login", loginDetails);
      console.log(response.data);
      return response.data;
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data.message);
      } else {
        setFormError("something went wrong");
      }
    },
    onSuccess: ( data) => {
      setUser(data);
     navigate("/create-blog");
    },
  });

  function handleLogin() {
    mutate({ identifier, password });
    setFormError("")
  }

  return (
    <Box component="section" mt={2}>
      <Typography
        variant="h1"
        textTransform="uppercase"
        fontSize={50}
        textAlign="center"
        gutterBottom
      >
        Welcome back
      </Typography>
      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
          <Paper component="form" sx={{ p: 2 }}>
            <Stack spacing={2}>
              <TextField
                label="Username or emailAddress"
                type="text"
                fullWidth
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={handleLogin}
                loading={isPending}
              >
                Sign In
              </Button>
              <Typography variant="body1">
                Dont have an account?{" "}
                <MuiLink component={Link} to="/register">
                  Create one
                </MuiLink>
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
