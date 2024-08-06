import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { getArticles, getComments } from "../utils/api";
import LoadingDolphin from "../assets/LoadingDolphin.json";

export function LoadArticles({ topic, sortArticlesBy, order, articleId = "" }) {
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
  }, []);

  return { isLoading, articles };
}

export function LoadComments(articleId) {
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  useEffect(() => {
    setIsLoadingComments(true);
    getComments(articleId)
      .then((articles) => {
        setComments(articles);
        setIsLoadingComments(false);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return { isLoadingComments, comments };
}

export function Loading() {
  return <Lottie animationData={LoadingDolphin} loop={true} />;
}
