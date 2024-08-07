import { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { patchVote, deleteComment } from "../utils/api";
import { UsernameContext } from "../contexts/UsernameProvider";
import LikeImage from "../assets/Like.png";
import DeleteImage from "../assets/DeleteComment.png";

export default function CommentCard({ comment, rerender, setRerender }) {
  const [commentOptimisticLike, setCommentOptimisticLike] = useState(0);
  const date = new Date(comment.created_at).toDateString();
  const username = useContext(UsernameContext);

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

  function handleCommentDelete() {
    deleteComment(comment.comment_id)
      .then(() => {
        setRerender(!rerender);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function removeCommentButton() {
    return (
      <Button variant="text" onClick={handleCommentDelete}>
        <img src={DeleteImage} height="25px" className="delete" />
      </Button>
    );
  }

  return (
    <Card sx={{ minWidth: 250, width: "88vw" }}>
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
          className={
            comment.author === username
              ? "comment-card-delete-like"
              : "comment-card-date-likes"
          }
        >
          {date}
          <span>
            {comment.author === username && removeCommentButton()}
            <Button variant="text" onClick={handleCommentLike}>
              <img src={LikeImage} height="25px" className="like" />
            </Button>
            {comment.votes + commentOptimisticLike}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}
