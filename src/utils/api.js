import axios from "axios";

const dolphinNewsApi = axios.create({
  baseURL: "https://dolphin-news.onrender.com/api/",
});

export function getArticles({ topic, sortArticlesBy, order }) {
  return dolphinNewsApi
    .get("/articles", { params: { topic, sortArticlesBy, order } })
    .then(({ data }) => {
      return data.articles;
    });
}
