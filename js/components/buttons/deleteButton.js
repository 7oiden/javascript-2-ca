import { baseUrl } from "../../settings/api.js";
import { getToken } from "../../utils/storage.js";
import { getExistingFavs, saveFavs } from "../../utils/storage.js";
import displayAlert from "../common/displayAlert.js";

export default function deleteButton(id) {
  const deleteContainer = document.querySelector(".delete-container");

  deleteContainer.innerHTML = `<button type="button" class="button delete-button">Delete</button>`;

  const deleteButton = document.querySelector(".delete-button");

  deleteButton.onclick = async function () {
    const performDelete = confirm(
      "Are you sure you want to delete this article?"
    );

    if (performDelete) {
      const url = baseUrl + "articles/" + id;

      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (!json.error) {
          //removes deleted article from favorites list
          const currentFavs = getExistingFavs();

          const newFavs = currentFavs.filter((fav) => {
            return parseInt(fav.id) !== id;
          });

          saveFavs(newFavs);

          displayAlert(
            "success",
            "Article successfully deleted",
            ".alert-container"
          );

          setTimeout(function () {
            location.href = "/";
          }, 1500);
        }

        if (json.error) {
          displayAlert("error", json.message, ".alert-container");
        }

        console.log(json);
      } catch (error) {
        //console.log(error);
        displayAlert("error", "Something went wrong!", ".alert-container");
      }
    }
  };
}
