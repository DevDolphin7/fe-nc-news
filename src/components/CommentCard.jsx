import { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { deleteComment } from "../utils/api";
import { UsernameContext } from "../contexts/UsernameProvider";
import LikeButton from "./LikeButton";
import DeleteImage from "../assets/DeleteComment.png";

export default function CommentCard({ comment, rerender, setRerender }) {
  const [commentOptimisticLike, setCommentOptimisticLike] = useState(0);
  const date = new Date(comment.created_at).toDateString();
  const username = useContext(UsernameContext);

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
            <LikeButton
              optimisticLike={commentOptimisticLike}
              setOptimisticLike={setCommentOptimisticLike}
              id={comment.comment_id}
              endpoint={"comments"}
            />
            {comment.votes + commentOptimisticLike}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}
