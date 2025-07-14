import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

interface BlogCardProps {
  blog: {
    id: string;
    title: string;
    synopsis: string;
    featuredImg: string;
    isDeleted: boolean;
    authorname: string;
  };
}

function BlogCard({ blog }: BlogCardProps) {
  const { id, title, synopsis, featuredImg, isDeleted, authorname } = blog;

  if (isDeleted) return null;

  const initials = authorname
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const cld = new Cloudinary({
    cloud: { cloudName: "drsnqcita" },
  });

  const img = cld.image(featuredImg);
  img.resize(fill().width(300).height(200));

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <AdvancedImage cldImg={img} />

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
            {authorname}
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
