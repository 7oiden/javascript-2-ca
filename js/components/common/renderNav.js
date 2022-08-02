import { getUsername } from "../../utils/storage.js";
import logoutIcon from "./logoutIcon.js";

export default function renderNav() {
  const { pathname } = document.location;

  const navContainer = document.querySelector(".nav-container");

  const username = getUsername();

  let logLink = `
    <a href="login.html" class="${
      pathname === "/login.html" ? "active" : ""
    }">Login</a>
    `;

  let authUser = "";
  let addLink = "";

  if (username) {
    logLink = `
    <div>
    <i id="logout" class="fas fa-sign-out-alt"></i>
    </div>`;

    addLink = `
    <a href="add.html" class="${
      pathname === "/add.html" ? "active" : ""
    }">Add</a>`;

    authUser = `
    <span>Signed in as: <em>${username}</em></span>`;
  }

  navContainer.innerHTML = `
  <div class="nav-menu">
  <div>
  <a href="/" 
  class="${
    pathname === "/" || pathname === "/index.html" ? "active" : ""
  }">Home</a>
  <a href="favorites.html" class="${
    pathname === "/favorites.html" ? "active" : ""
  }">Favorites</a>
  ${addLink}
  </div>
  ${logLink}
  </div>
  <div class="log-cred">${authUser}</div>`;

  logoutIcon();
}
