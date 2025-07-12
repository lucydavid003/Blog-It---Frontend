import { Routes, Route,  } from "react-router-dom";
import { createTheme, colors, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./Components/Navbar";
import Landing from "./Pages/Landing";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import CreateBlog from "./Pages/Createblog";
import  { Toaster } from 'react-hot-toast';
import Blogs from "./Pages/Blogs";
import Profile from "./Pages/Profile";


const client = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: colors.blueGrey[500],
      contrastText: "#fff",
    },
  },
});
const App: React.FC = () => {
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        
        <Toaster/>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path ="/blogs" element={<Blogs/>}/>
            <Route path ="/profile" element={<Profile/>}/>

          </Routes>
        </>
        
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
