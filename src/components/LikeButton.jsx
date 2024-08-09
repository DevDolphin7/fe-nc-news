import { useState } from "react";
import Button from "@mui/material/Button";
import { patchVote } from "../utils/api";
import LikeImage from "../assets/Like.png";

export default function LikeButton({
  optimisticLike,
  setOptimisticLike,
  id,
  endpoint
}) {
  const [disableButton, setDisableButton] = useState(false);

  function handleLikeError(optimisticValue, error) {
    if (setOptimisticLike) {
      setOptimisticLike(optimisticValue);
    }
    setDisableButton(false);
    alert(error);
  }

  function handleLike() {
    setDisableButton(true);
    if (optimisticLike === 0) {
      setOptimisticLike(1);
      patchVote(`/${endpoint}/${id}`, 1)
        .then(() => {
          setDisableButton(false);
        })
        .catch((error) => {
          handleLikeError(0, error);
        });
    } else {
      setOptimisticLike(0);
      patchVote(`/${endpoint}/${id}`, -1)
        .then(() => {
          setDisableButton(false);
        })
        .catch((error) => {
          handleLikeError(1, error);
        });
    }
  }

  return (
    <Button variant="text" onClick={handleLike} disabled={disableButton}>
      <img src={LikeImage} height="25px" />
    </Button>
  );
}
