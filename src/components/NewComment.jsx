import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { postComment } from "../utils/api";
import AddCommentImage from "../assets/AddComment.png";
import CloseImage from "../assets/Close.png";
import "./NewComment.css";
import { UsernameContext } from "../contexts/UsernameProvider";

export default function NewComment({ rerender, setRerender }) {
  const [newCommentOpen, setNewCommentOpen] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const { article_id } = useParams();
  const username = useContext(UsernameContext);

  function writeComment() {
    function handleInput(event) {
      event.preventDefault();
      setCommentInput(event.target.value);
      event.target.value === "" ? setDisableButton(true) : setDisableButton(false);
    }

    function addComment() {
      if (commentInput !== "") {
        postComment(article_id, username, commentInput)
          .then(() => {
            setCommentInput("");
            setDisableButton(true);
            setRerender(!rerender);
          })
          .catch((error) => {
            alert(error);
          });
      }
    }

    return (
      <Box
        component="form"
        sx={{
          m: 1,
          minWidth: "15ch",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          margin: "15px 5px 0 5px",
        }}
        noValidate
        autoComplete="off"
      >
        {
          // Input is a controlled component utilising handleInput
        }
        <TextField
          error
          fullWidth
          multiline
          label="New comment"
          variant="filled"
          value={commentInput}
          onChange={handleInput}
        />
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {username}:
        </Typography>
        <Button
          onClick={addComment}
          sx={{ color: "#eb1c24" }}
          disabled={disableButton}
        >
          Post
        </Button>
      </Box>
    );
  }

  return (
    <div className="comment-header">
      <Typography variant="h5" component="div">
        Comments:
      </Typography>
      <Button variant="text" onClick={() => setNewCommentOpen(!newCommentOpen)}>
        {newCommentOpen ? (
          <img
            src={CloseImage}
            alt="Close new comment section"
            height="25"
            className="add-comment"
          />
        ) : (
          <img
            src={AddCommentImage}
            alt="Add a comment"
            height="25"
            className="add-comment"
          />
        )}
      </Button>
      {newCommentOpen && writeComment()}
    </div>
  );
}
