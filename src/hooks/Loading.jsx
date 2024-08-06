import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { getArticles } from "../utils/api";
import LoadingDolphin from "../assets/LoadingDolphin.json";

export function LoadArticles({ topic, sortArticlesBy, order }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticles({ topic, sortArticlesBy, order })
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

export function Loading() {
  return <Lottie animationData={LoadingDolphin} loop={true} />;
}
