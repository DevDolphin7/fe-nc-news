import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function ArticlesCard({ article }) {
  const date = new Date(article.created_at).toDateString();
  return (
    <Card sx={{ maxWidth: 345, minWidth: 250, width: "88vw"}}>
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
          variant="body2"
          color="text.secondary"
          className="article-card-user-comments"
        >
          {article.author}
          <span>Comments: {article.comment_count}</span>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="article-card-date-likes"
        >
          {date}
          <span>Likes: {article.votes}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}
