import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

import { useCookies } from "react-cookie";

const Navbar: React.FC = () => {
  const [cookies, , removeCookie] = useCookies(['authToken']);
  const handleLogout = () => {
    removeCookie('authToken')
  }
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "inherit" }}>
          BlogIt
        </Typography>
        <Box>
          {
            cookies.authToken ?
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            :
          <>
          <Button color="inherit" component={Link} to="/register">Register</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          </>
          }
          
          <Button  color="inherit" component={Link} to="/create-blog">New Blog</Button>
          <Button  color="inherit" component={Link} to="/blogs">All blogs</Button>
          <Button  color="inherit" component={Link} to="/profile">Profile </Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
