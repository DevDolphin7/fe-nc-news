import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { getArticles, getComments } from "../utils/api";
import LoadingDolphin from "../assets/LoadingDolphin.json";

export function LoadArticles({
  topic,
  sortArticlesBy,
  order,
  articleId = "",
  rerender,
}) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, sortArticlesBy, order, articleId)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  }, [rerender]);

  return { isLoading, articles };
}

export function LoadComments(articleId, rerender) {
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  useEffect(() => {
    setIsLoadingComments(true);
    getComments(articleId)
      .then((comments) => {
        comments.sort((a, b) => a.created_at < b.created_at);
        setComments(comments);
        setIsLoadingComments(false);
      })
      .catch((error) => {
        alert(error);
      });
  }, [rerender]);

  return { isLoadingComments, comments };
}

export function Loading() {
  return <Lottie animationData={LoadingDolphin} loop={true} />;
}
