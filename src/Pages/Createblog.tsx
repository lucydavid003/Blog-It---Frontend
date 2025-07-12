import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  Stack,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../api/axios";
import { useMutation } from "@tanstack/react-query";


interface NewBlog {
  
  title: string;
  featuredImg: string;
  content: string;
  synopsis: string;
}

function CreateBlog() {

  const { isPending, mutate } = useMutation({
    mutationKey: ["Create-Blog"],
    mutationFn: async (blog: NewBlog) => {
      const res = await axiosInstance.post("/blogs", blog);
      console.log(res.data);
      return res.data;
    },
    onSuccess: () => {
    navigate("/blogs"); 
  },
  onError: (err) => {
    if (axios.isAxiosError(err)) {
      setFormError(err.response?.data.message || "Something went wrong");
    } else {
      setFormError("Something went wrong");
    }
  },
  });

  const [title, setTitle] = useState("");
  const [featuredImg, setFeaturedImg] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    setFormError("");
    const newBlog = {
      title,
      featuredImg,
      synopsis,
      content,
    };
    mutate(newBlog);
    
   

      
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
        Create a new blog
      </Typography>
      <Grid container justifyContent={"center"}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}>
          <Paper component={"form"} sx={{ p: 2 }}>
            <Stack spacing={2}>
              {formError && <Alert severity="error">{formError}</Alert>}
              <TextField
                label="Blog Title"
                type="text"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Featured Image URL"
                type="text"
                fullWidth
                required
                value={featuredImg}
                onChange={(e) => setFeaturedImg(e.target.value)}
              />
              <TextField
                label="Synopsis"
                type="text"
                fullWidth
                multiline
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
              />
              <TextField
                label="Content (Markdown)"
                type="text"
                fullWidth
                multiline
                minRows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={handleSubmit}
                loading={isPending}
              >
                Submit Blog
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreateBlog;
