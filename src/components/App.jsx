import { Routes, Route } from "react-router-dom";
import Nav from "./Nav/Nav";
import Articles from "../routes/Articles";
import ArticleId from "../routes/ArticleId";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles/:article_id" element={<ArticleId />} />
      </Routes>
    </>
  );
}
