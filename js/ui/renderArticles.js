import { getExistingFavs, saveFavs } from "../utils/storage.js";
import { articleContainer } from "../settings/constants.js";

export function renderArticles(articles) {
 
  const favorites = getExistingFavs();

  articleContainer.innerHTML = "";

  articles.forEach((article) => {
    let styleClass = "far";

    const objectAlreadyFav = favorites.find((fav) => {
      return parseInt(fav.id) === article.id;
    });

    if (objectAlreadyFav) {
      styleClass = "fas";
    }

    articleContainer.innerHTML += `
      <div class="card">
      <h2>${article.title}</h2>
      <p><em>by ${article.author}</em></p>
      <hr>
      <p>${article.summary}</p>
      <i class="${styleClass} fa-heart" data-id="${article.id}" data-title="${article.title}" data-author="${article.author}" data-summary="${article.summary}"></i>
      <a href="edit.html?id=${article.id}"> 
      <i class="fas fa-edit"></i>
       </a>
      </div>
      `;
  });

  const favIcons = document.querySelectorAll(".fa-heart");

  favIcons.forEach((icon) => {
    icon.addEventListener("click", handleFavClick);
  });

  function handleFavClick() {
    this.classList.toggle("fas");
    this.classList.toggle("far");

    const id = this.dataset.id;
    const title = this.dataset.title;
    const author = this.dataset.author;
    const summary = this.dataset.summary;

    const currentFavs = getExistingFavs();

    const articleInStorage = currentFavs.find((fav) => {
      return fav.id === id;
    });

    if (!articleInStorage) {
      const article = {
        id: id,
        title: title,
        author: author,
        summary: summary,
      };
      currentFavs.push(article);
      saveFavs(currentFavs);
    } else {
      const newFavs = currentFavs.filter((fav) => {
        return fav.id !== id;
      });
      saveFavs(newFavs);
    }
  }
}


