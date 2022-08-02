import { loginUrl } from "./settings/api.js";
import displayAlert from "./components/common/displayAlert.js";
import renderNav from "./components/common/renderNav.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { alertContainer } from "./settings/constants.js";

const loginForm = document.querySelector(".login-form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

renderNav();

loginForm.addEventListener("submit", submitLoginForm);

function submitLoginForm(event) {
  event.preventDefault();

  alertContainer.innerHTML = "";

  const usernameInput = username.value.trim();
  const passwordInput = password.value.trim();

  if (usernameInput.length === 0 || passwordInput.length === 0) {
    return displayAlert(
      "warning",
      "Username and/or password is missing",
      ".alert-container"
    );
  }

  performLogin(usernameInput, passwordInput);
}

async function performLogin(username, password) {

  const loginData = JSON.stringify({
    identifier: username,
    password: password,
  });

  const options = {
    method: "POST",
    body: loginData,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(loginUrl, options);
    const json = await response.json();

    if (json.user) {
  
      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "/";
    }

    if (json.error) {
      displayAlert(
        "warning",
        "Username and/or password is invalid",
        ".alert-container"
      );
    }
  } catch (error) {
    displayAlert("error", "Something went wrong!", ".alert-container");
  }
}
