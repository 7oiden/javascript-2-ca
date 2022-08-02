import renderNav from "./components/common/renderNav.js";
import { articlesUrl } from "./settings/api.js";
import displayAlert from "./components/common/displayAlert.js";
import { getToken } from "./utils/storage.js";
import { alertContainer } from "./settings/constants.js";

const token = getToken();

renderNav();

const addForm = document.querySelector(".add-form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const summary = document.querySelector("#summary");

addForm.addEventListener("submit", submitAddForm);

function submitAddForm(event) {
  event.preventDefault();

  alertContainer.innerHTML = "";

  const titleInput = title.value.trim();
  const authorInput = author.value.trim();
  const summaryInput = summary.value.trim();

  if (
    titleInput.length === 0 ||
    authorInput.length === 0 ||
    summaryInput.length === 0
  ) {
    return displayAlert(
      "warning",
      "Please add title, author and summary before proceeding",
      ".alert-container"
    );
  }

  addArticle(titleInput, authorInput, summaryInput);
}

async function addArticle(title, author, summary) {

  const addData = JSON.stringify({
    title: title,
    author: author,
    summary: summary,
  });

  const options = {
    method: "POST",
    body: addData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(articlesUrl, options);
    const json = await response.json();

    if (json.created_at) {
      displayAlert(
        "success",
        "New article successfully created",
        ".alert-container"
      );

      setTimeout(function () {
        alertContainer.innerHTML = "";
      }, 1500);

      addForm.reset();
    }

    if (json.error) {
      displayAlert("error", json.message, ".alert-container");
    }
    //console.log(json);
  } catch (error) {
    displayAlert("error", "Something went wrong!", ".alert-container");
  }
}
