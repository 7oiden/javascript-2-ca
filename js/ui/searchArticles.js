import { renderArticles } from "./renderArticles.js";

export function searchArticles(articles) {
  const searchInput = document.querySelector("#search");

  searchInput.onkeyup = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();

    console.log(searchValue);

    const filteredArticles = articles.filter(function (article) {
      if (article.title.toLowerCase().startsWith(searchValue)) {
        return true;
      }
    });

    renderArticles(filteredArticles);
  };
}
