import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Stack,
  Alert,
   Link as MuiLink
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface User {
  firstName: String;
  lastName: String;
  userName: String;
  emailAddress: String;
  password: String;
}

function Register() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setusertName] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [Confpassword, setConfpassword] = useState("");
  const [formError,setFormError] = useState("")
  const navigate = useNavigate ();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (newUser: User) => {
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        newUser
      );
      console.log(response);
      return response.data;
    },
     onError :(err) => {
    if (axios.isAxiosError(err)){
      setFormError(err.response?.data.message);

    }else{
      setFormError ("something went wrong")
    }
  },
  onSuccess :()=> {
    navigate("/login")
  }
  });

  

  
  


  function handleSignUp() {
    setFormError('')
    if (password  !== Confpassword){
      setFormError("password and Confpassord must match");
      return
    }
    const newUser = { firstName, lastName, emailAddress, userName, password };
    console.log(newUser);
    mutate(newUser);
  }

  return (
    <Box component={"section"} mt={2}>
      <Typography
        variant="h1"
        textTransform={"uppercase"}
        fontSize={50}
        textAlign={"center"}
        gutterBottom
      >
        All you need is a free account.
      </Typography>
      <Grid container justifyContent={"center"}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
          <Paper component={"form"} sx={{ p: 2 }}>
            <Stack spacing={2} >
              {formError && <Alert severity="error"> {formError}</Alert>}
              <TextField
                label="First name"
                type="text"
                fullWidth
                required
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              />
              <TextField
                label="Last name"
                type="text"
                fullWidth
                required
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
              <TextField
                label="Username"
                type="text"
                fullWidth
                required
                value={userName}
                onChange={(e) => setusertName(e.target.value)}
              />
              <TextField
                label="Email Address"
                type="Email"
                fullWidth
                required
                value={emailAddress}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <TextField
                label="Confirm password"
                type="password"
                fullWidth
                required
                value={Confpassword}
                onChange={(e) => setConfpassword(e.target.value)}
              />

              <Button
                variant="contained"
                onClick={handleSignUp}
                loading={isPending}
              >
                Sign Up
              </Button>
              <Typography variant="body1">Already have an account? {""}
                <MuiLink component={Link} to="/login">Login</MuiLink>
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Register;
