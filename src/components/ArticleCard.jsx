import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LikeImage from "../assets/Like.png";
import CommentImage from "../assets/Comment.png";

export default function ArticlesCard({ article }) {
  const date = new Date(article.created_at).toDateString();
  return (
    <Card sx={{ minWidth: 250 }}>
      <CardMedia
        component="img"
        height="250"
        sx={{ objectFit: "contain" }}
        image={article.article_img_url}
        title={article.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          color="text.primary"
          component="div"
        >
          {article.body}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="article-card-user-comments"
        >
          {article.author}
          <span>
            <Button><img src={CommentImage} height="25px"  /></Button>
            {article.comment_count}
          </span>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="article-card-date-likes"
        >
          {date}
          <span>
            <Button variant="text">
              <img src={LikeImage} height="25px" />
            </Button>
            {article.votes}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}
