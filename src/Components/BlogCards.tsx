import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    synopsis: string;
    featuredImg: string;
    authorname:string 
      

  };
}

function BlogCard({ blog }: BlogCardProps) {
  const { id, title, synopsis, featuredImg, authorname } = blog;

  const initials = {authorname};

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="180" image={featuredImg} alt={title} />
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {synopsis}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Avatar>{initials.authorname}</Avatar>
          <Typography variant="subtitle2" sx={{ ml: 1 }}>
            {authorname}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          to={"/blogs/"}
          variant="outlined"
          sx={{ color: "blueviolet" }}>
            </Button>

            </CardActions>
            </Card>
      
  

);}
export default BlogCard;
