import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";


interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    synopsis: string;
    featuredImg: string;
    isDeleted: boolean;
    authorName: string;
  };
}

function BlogCard({ blog }: BlogCardProps) {
  const { id, title, synopsis, featuredImg, isDeleted, authorName } = blog;

  if (isDeleted) return null;

  const initials = authorName.split(" ").map((n)=>n[0]).join('');


 
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia sx={{height:200}} image={featuredImg}/>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {synopsis}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Avatar>{initials}</Avatar>
          <Typography variant="subtitle2" sx={{ ml: 1 }}>
            {authorName}
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          component={Link}
          to={`/blogs/${id}`}
          variant="outlined"
          sx={{ color: "red" }}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}

export default BlogCard;
