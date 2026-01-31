// js/nav-auth.js
import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const navLogin = document.getElementById("navLogin");
const navUser = document.getElementById("navUser");
const navUserName = document.getElementById("navUserName");

/* 🔒 HARD DEFAULT (before Firebase resolves) */
if (navUser) navUser.hidden = true;
if (navLogin) navLogin.hidden = false;
if (navUserName) navUserName.textContent = "";

onAuthStateChanged(auth, (user) => {
  if (!navLogin || !navUser) return;

  if (user) {
    const name =
      user.displayName?.split(" ")[0] ||
      user.email?.split("@")[0] ||
      "Friend";

    navUserName.textContent = name;

    navLogin.hidden = true;    // hide Login
    navUser.hidden = false;   // show Welcome
  } else {
    navUser.hidden = true;    // hide Welcome
    navLogin.hidden = false;  // show Login
    navUserName.textContent = ""; // prevents "Welcome !"
  }
});

/* Optional logout on click */
navUser?.addEventListener("click", async () => {
  const ok = confirm("Log out?");
  if (!ok) return;
  await signOut(auth);
  location.href = "index.html";
});
