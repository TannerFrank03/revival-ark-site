// js/firebase.js
import { initializeApp, getApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBD8kyzTFHF1V6clr8yZwcc1JNsPBsVxyI",
  authDomain: "revival-ark.firebaseapp.com",
  projectId: "revival-ark",
  storageBucket: "revival-ark.firebasestorage.app",
  messagingSenderId: "992937971780",
  appId: "1:992937971780:web:a413ec1fd8b44d217e6c11",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
