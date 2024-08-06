import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LoadArticles, LoadComments, Loading } from "../hooks/Loading";
import ArticleCard from "../components/ArticleCard";
import CommentCard from "../components/CommentCard";
import AddCommentImage from "../assets/AddComment.png";
import "./Articles.css";

export default function ArticleId() {
  const { article_id } = useParams();

  const { isLoading, articles } = LoadArticles({ articleId: `/${article_id}` });
  const { isLoadingComments, comments } = LoadComments(article_id);

  if (isLoading || isLoadingComments) {
    return <Loading />;
  }

  return (
    <main>
      <section id="article">
        <div className="article-card">
          <ArticleCard article={articles} />
        </div>
      </section>
      <div id="divider"></div>
      <section id="comments">
        <div className="comment-header">
          <Typography variant="h5" component="div">Comments:</Typography>
          <Button variant="text">
            <img src={AddCommentImage} alt="Add a comment" height="25" />
          </Button>
        </div>
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id} className="comment-card">
              <CommentCard comment={comment} />
            </div>
          );
        })}
      </section>
    </main>
  );
}
