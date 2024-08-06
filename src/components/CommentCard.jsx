import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LikeImage from "../assets/Like.png";

export default function CommentCard({ comment }) {
    const date = new Date(comment.created_at).toDateString();
  return (
    <Card sx={{ minWidth: 250 }}>
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
            <Button variant="text">
              <img src={LikeImage} height="25px" />
            </Button>
            {comment.votes}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}
