import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LoadArticles, Loading } from "../hooks/Loading";
import ArticlesCard from "../components/ArticlesCard";
import "./Articles.css";

export default function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rerender, setRerender] = useState(false);
  const topic = searchParams.get("topic");
  const sortArticlesBy = searchParams.get("sortArticlesBy");
  const order = searchParams.get("order");

  useEffect(() => {
    setRerender(!rerender);
  }, [searchParams]);

  const { isLoading, articles } = LoadArticles({
    topic,
    sortArticlesBy,
    order,
    rerender,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      {articles.map((article) => (
        <div key={article.title} className="article-card">
          <Link to={`/articles/${article.article_id}`}>
            <ArticlesCard article={article} />
          </Link>
        </div>
      ))}
    </section>
  );
}
