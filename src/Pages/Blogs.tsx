import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import {
  Grid,
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import BlogCard from "../Components/BlogCards";
import axiosInstance from "../api/axios";
import { Link } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
  synopsis: string;
  featuredImg: string;
  authorname: string;
  isDeleted: boolean; 
}

function Blogs() {
  const {
    isPending,
    data: blogs,
    isError,
  } = useQuery<Blog[]>({
    queryKey: ["get-blogs"],
    queryFn: async () => {
      const response = await axiosInstance.get("/blogs", {
        withCredentials: true,
      });
      return response.data;
    },
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        All Blogs
      </Typography>

      {isPending && (
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Grid>
      )}

      {isError && (
        <Alert severity="error" sx={{ my: 2 }}>
          Could not fetch blogs. You may not be authorized.
          <Button component={Link} to="/login" sx={{ ml: 2 }}>
            Login
          </Button>
        </Alert>
      )}

      <Grid container spacing={4}>
        {blogs
          ?.filter((blog) => !blog.isDeleted) 
          .map((blog) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }} key={blog.id}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default Blogs;
