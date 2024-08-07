import axios from "axios";

const dolphinNewsApi = axios.create({
  baseURL: "https://dolphin-news.onrender.com/api/",
});

export function getArticles(topic, sortArticlesBy, order, articleId) {
  return dolphinNewsApi
    .get(`/articles${articleId}`, { params: { topic, sortArticlesBy, order } })
    .then(({ data }) => {
      return data.articles ? data.articles : data.article;
    });
}

export function getComments(articleId) {
  return dolphinNewsApi
    .get(`/articles/${articleId}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
}

export function patchVote(endpoint, inc_votes) {
  return dolphinNewsApi.patch(endpoint, { inc_votes });
}

export function postComment(articleId, username, body){
  return dolphinNewsApi.post(`/articles/${articleId}/comments`, {username, body})
}