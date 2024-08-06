import { useState } from "react";
import { Link } from "react-router-dom";
import { LoadArticles, Loading } from "../hooks/Loading";
import ArticleCard from "../components/ArticleCard";
import "./Articles.css";

export default function Articles() {
  const [topic, setTopic] = useState(undefined);
  const [sortArticlesBy, setSortArticlesBy] = useState(undefined);
  const [order, setOrder] = useState(undefined);

  const { isLoading, articles } = LoadArticles({
    topic,
    sortArticlesBy,
    order,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      {articles.map((article) => (
        <div key={article.title} className="article-card">
          <Link to={`/articles/${article.article_id}`}>
            <ArticleCard article={article} />
          </Link>
        </div>
      ))}
    </section>
  );
}
