import { getExistingFavs } from "./utils/storage.js";
import clearFavs from "./components/buttons/clearFavs.js";
import renderNav from "./components/common/renderNav.js";
import { articleContainer } from "./settings/constants.js";

renderNav();

const favorites = getExistingFavs();

const clearButton = document.querySelector(".clear-button");
const heading = document.querySelector(".heading-container");

let favCount = favorites.length;

heading.innerHTML = `
<h1>Favorites</h1><span class="fav-count">(${favCount})</span>
`;

if (favCount === 0) {
  articleContainer.innerHTML = `<div class="card favorites-card"><p class="fav-message">Favorites list is empty...</p></div>`;
  clearButton.style.display = "none";
  heading.innerHTML = `<h1>Favorites</h1>`;
}

favorites.forEach((favorite) => {
  articleContainer.innerHTML += `
      <div class="card">
      <h2>${favorite.title}</h2>
      <p><em>by ${favorite.author}</em></p>
      <hr>
      <p>${favorite.summary}</p>
      <i class="fas fa-heart fav-page"></i>
      </div>`;
});

clearFavs();
