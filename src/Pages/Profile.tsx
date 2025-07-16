import {
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Box,
  Divider,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { useState } from "react";

interface Blog {
  id: string;
  title: string;
  synopsis: string;
  featuredImg: string;
  authorname: string;
}

interface User {
  firstName: string;
  lastName: string;
  userName: string;
  emailAddress: string;
}

function Profile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const { data: user = {
    firstName: "",
    lastName: "",
    userName: "",
    emailAddress: ""
  } } = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/me");
      return res.data;
    },
  });

  const { data: blogs = [] } = useQuery<Blog[]>({
    queryKey: ["myBlogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/blogs/users/blogs");
      return res.data;
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (updatedUser: User) => axiosInstance.patch("/user", updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["user"]});
      alert("User info updated.");
    },
    onError: () => alert("Update failed."),
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (passwords: { currentPassword: string; newPassword: string }) =>
      axiosInstance.patch("/user/password", passwords),
    onSuccess: () => alert("Password updated!"),
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Password update failed.");
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/blogs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries( {queryKey:["myBlogs"]});
      alert("Blog deleted.");
    },
    onError: () => alert("Failed to delete blog."),
  });

  const handleUserUpdate = () => updateUserMutation.mutate(user);

  const handlePasswordUpdate = () => updatePasswordMutation.mutate(passwordData);

  const handleDeleteBlog = (id: string) => deleteBlogMutation.mutate(id);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Profile</Typography>

      <Typography variant="h6" mt={4}>My Blogs</Typography>
      <Grid container spacing={2}>
        {blogs.map((blog) => (
          <Grid  size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 4 }}key={blog.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Box>
                <CardMedia component="img" height="140" image={blog.featuredImg} alt={blog.title} />
                <CardContent>
                  <Typography variant="h6">{blog.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.synopsis}
                  </Typography>
                </CardContent>
              </Box>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button size="small" onClick={() => navigate(`/edit-blog/${blog.id}`)}>Update</Button>
                <Button size="small" color="error" onClick={() => handleDeleteBlog(blog.id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6">Update Personal Information</Typography>
      <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
        <TextField
          label="First Name"
          value={user.firstName}
          onChange={(e) => queryClient.setQueryData(["user"], { ...user, firstName: e.target.value })}
        />
        <TextField
          label="Last Name"
          value={user.lastName}
          onChange={(e) => queryClient.setQueryData(["user"], { ...user, lastName: e.target.value })}
        />
        <TextField
          label="Username"
          value={user.userName}
          onChange={(e) => queryClient.setQueryData(["user"], { ...user, userName: e.target.value })}
        />
        <TextField
          label="Email"
          value={user.emailAddress}
          onChange={(e) => queryClient.setQueryData(["user"], { ...user, emailAddress: e.target.value })}
        />
        <Button variant="contained" onClick={handleUserUpdate}>Update Info</Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6">Update Password</Typography>
      <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
        <TextField
          label="Current Password"
          type="password"
          value={passwordData.currentPassword}
          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
        />
        <TextField
          label="New Password"
          type="password"
          value={passwordData.newPassword}
          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
        />
        <Button variant="contained" onClick={handlePasswordUpdate}>Update Password</Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Button variant="outlined" color="error" onClick={handleLogout}>Log Out</Button>
    </Container>
  );
}

export default Profile;
