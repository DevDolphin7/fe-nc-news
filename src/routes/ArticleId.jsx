import { useState } from "react";
import { useParams } from "react-router-dom";
import { LoadArticles, LoadComments, Loading } from "../hooks/Loading";
import ArticleCard from "../components/FullArticleCard";
import NewComment from "../components/NewComment";
import CommentCard from "../components/CommentCard";
import "./Articles.css";

export default function ArticleId() {
  const { article_id } = useParams();
  const [rerender, setRerender] = useState(false);

  const { isLoading, articles } = LoadArticles({
    articleId: `/${article_id}`,
    rerender,
  });
  const { isLoadingComments, comments } = LoadComments(article_id, rerender);

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
      <div className="page-divider"></div>
      <section id="comments">
        <NewComment rerender={rerender} setRerender={setRerender} />
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id} className="comment-card">
              <CommentCard
                comment={comment}
                rerender={rerender}
                setRerender={setRerender}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}
