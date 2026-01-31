// js/signin-auth.js
import { auth } from "./firebase.js";
import {
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const $ = (s, r = document) => r.querySelector(s);

// ✅ ALWAYS go back home after login
const returnTo = "index.html";

const tabLogin = $("#tabLogin");
const tabSignup = $("#tabSignup");
const loginWrap = $("#loginWrap");
const signupWrap = $("#signupWrap");
const authTitle = $("#authTitle");
const authMsg = $("#authMsg");

function showMsg(text, kind = "ok") {
  authMsg.textContent = text;
  authMsg.classList.remove("ok", "err");
  authMsg.classList.add(kind === "err" ? "err" : "ok");
  authMsg.style.display = "block";
}
function clearMsg() {
  authMsg.textContent = "";
  authMsg.classList.remove("ok", "err");
  authMsg.style.display = "none";
}

function setMode(mode) {
  clearMsg();
  const isLogin = mode === "login";

  tabLogin.classList.toggle("active", isLogin);
  tabSignup.classList.toggle("active", !isLogin);

  tabLogin.setAttribute("aria-selected", isLogin ? "true" : "false");
  tabSignup.setAttribute("aria-selected", !isLogin ? "true" : "false");

  loginWrap.hidden = !isLogin;
  signupWrap.hidden = isLogin;

  authTitle.textContent = isLogin ? "Welcome back" : "Create your account";

  const url = new URL(location.href);
  url.searchParams.set("mode", mode);
  history.replaceState({}, "", url.toString());
}

function friendlyAuthError(err) {
  const code = err?.code || "";
  if (code.includes("auth/invalid-credential")) return "Incorrect email or password.";
  if (code.includes("auth/user-not-found")) return "No account found for that email.";
  if (code.includes("auth/wrong-password")) return "Incorrect password.";
  if (code.includes("auth/email-already-in-use")) return "That email is already registered. Try logging in.";
  if (code.includes("auth/invalid-email")) return "Please enter a valid email address.";
  if (code.includes("auth/weak-password")) return "Password is too weak. Use at least 6 characters.";
  if (code.includes("auth/popup-closed-by-user")) return "Popup closed before completing sign-in.";
  if (code.includes("auth/operation-not-allowed")) return "This sign-in method isn’t enabled in Firebase yet.";
  if (code.includes("auth/unauthorized-domain")) return "Add your Netlify domain in Firebase → Auth → Settings → Authorized domains.";
  return err?.message || "Something went wrong. Please try again.";
}

await setPersistence(auth, browserLocalPersistence);

// ✅ If already logged in AND they opened signin.html, send them home once.
// IMPORTANT: Do NOT redirect later while they're typing.
let checkedOnce = false;
onAuthStateChanged(auth, (user) => {
  if (checkedOnce) return;
  checkedOnce = true;
  if (user) location.href = returnTo;
});

// init mode
setMode(new URLSearchParams(location.search).get("mode") === "signup" ? "signup" : "login");
tabLogin.addEventListener("click", () => setMode("login"));
tabSignup.addEventListener("click", () => setMode("signup"));

document.addEventListener("click", (e) => {
  const modeLink = e.target.closest("[data-mode]");
  if (!modeLink) return;
  e.preventDefault();
  setMode(modeLink.getAttribute("data-mode"));
});

// login
$("#loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMsg();

  const email = $("#loginForm [name=email]").value.trim();
  const password = $("#loginForm [name=password]").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    showMsg("Logged in successfully. Redirecting…", "ok");
    setTimeout(() => (location.href = returnTo), 350);
  } catch (err) {
    showMsg(friendlyAuthError(err), "err");
  }
});

// signup
$("#signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMsg();

  const firstName = $("#signupForm [name=firstName]").value.trim();
  const lastName = $("#signupForm [name=lastName]").value.trim();
  const email = $("#signupForm [name=email]").value.trim();
  const password = $("#signupForm [name=password]").value.trim();

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: `${firstName} ${lastName}`.trim() });

    showMsg("Account created. Redirecting…", "ok");
    setTimeout(() => (location.href = returnTo), 350);
  } catch (err) {
    showMsg(friendlyAuthError(err), "err");
  }
});

// google
async function googleSSO() {
  clearMsg();
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await signInWithPopup(auth, provider);
    showMsg("Signed in with Google. Redirecting…", "ok");
    setTimeout(() => (location.href = returnTo), 350);
  } catch (err) {
    showMsg(friendlyAuthError(err), "err");
  }
}

// apple
async function appleSSO() {
  clearMsg();
  try {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    await signInWithPopup(auth, provider);
    showMsg("Signed in with Apple. Redirecting…", "ok");
    setTimeout(() => (location.href = returnTo), 350);
  } catch (err) {
    showMsg(friendlyAuthError(err), "err");
  }
}

$("#btnGoogle")?.addEventListener("click", googleSSO);
$("#btnGoogle2")?.addEventListener("click", googleSSO);
$("#btnApple")?.addEventListener("click", appleSSO);
$("#btnApple2")?.addEventListener("click", appleSSO);
