import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { patchVote } from "../utils/api";
import Button from "@mui/material/Button";
import LikeImage from "../assets/Like.png";

export default function CommentCard({ comment }) {
  const [commentOptimisticLike, setCommentOptimisticLike] = useState(0);
  const date = new Date(comment.created_at).toDateString();

  function handleCommentLike() {
    if (commentOptimisticLike === 0) {
      setCommentOptimisticLike(1);
      patchVote(`/comments/${comment.comment_id}`, 1).catch((error) => {
        setCommentOptimisticLike(0);
        alert(error);
      });
    } else {
      setCommentOptimisticLike(0);
      patchVote(`/comments/${comment.comment_id}`, -1).catch((error) => {
        setCommentOptimisticLike(1);
        alert(error);
      });
    }
  }

  return (
    <Card sx={{ minWidth: 250, width: "88vw"}}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {comment.author}:
        </Typography>
        <Typography variant="body2" color="text.primary">
          {comment.body}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="comment-card-date-likes"
        >
          {date}
          <span>
            <Button variant="text" onClick={handleCommentLike}>
              <img src={LikeImage} height="25px" />
            </Button>
            {comment.votes + commentOptimisticLike}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}
