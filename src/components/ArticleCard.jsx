import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { patchVote } from "../utils/api";
import LikeImage from "../assets/Like.png";
import CommentImage from "../assets/Comment.png";

export default function ArticlesCard({ article }) {
  const [articleOptimisticLike, setArticleOptimisticLike] = useState(0);
  const date = new Date(article.created_at).toDateString();

  function handleArticleLike() {
    if (articleOptimisticLike === 0) {
      setArticleOptimisticLike(1);
      patchVote(`/articles/${article.article_id}`, 1).catch((error) => {
        setArticleOptimisticLike(0);
        alert(error);
      });
    } else {
      setArticleOptimisticLike(0);
      patchVote(`/articles/${article.article_id}`, -1).catch((error) => {
        setArticleOptimisticLike(1);
        alert(error);
      });
    }
  }

  return (
    <Card sx={{ minWidth: 250, width: "88vw" }}>
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
          <span style={{ display: "flex", alignItems: "center" }}>
            <img
              src={CommentImage}
              height="25px"
              style={{ margin: "3px 11px" }}
            />
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
            <Button variant="text" onClick={handleArticleLike}>
              <img src={LikeImage} height="25px" />
            </Button>
            {article.votes + articleOptimisticLike}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}
