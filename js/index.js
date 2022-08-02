import { articlesUrl } from "./settings/api.js";
import displayAlert from "./components/common/displayAlert.js";
import { renderArticles } from "./ui/renderArticles.js";
import { searchArticles } from "./ui/searchArticles.js";
import renderNav from "./components/common/renderNav.js";

renderNav();

(async function fetchApi() {
  try {
    const response = await fetch(articlesUrl);
    const json = await response.json();

    renderArticles(json);
    searchArticles(json);
  } catch (error) {
    displayAlert("error", "An error has occurred when trying to fetch the API", ".article-container");
    //console.log(error);
  }
})();
