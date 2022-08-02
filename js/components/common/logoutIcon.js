import { clearLoginStorage } from "../../utils/storage.js";

export default function logoutIcon() {
  const icon = document.querySelector("#logout");

  if (icon) {
    icon.onclick = function () {
      const performLogout = confirm("Are you sure you want to sign out?");

      if (performLogout) {
        clearLoginStorage();
        location.href = "/";
      }
    };
  }
}
