import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const registerLink = document.getElementById("register-link");

// Växla mellan inloggnings- och registreringsformulär
registerLink.addEventListener("click", () => {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});

// Hantera registrering
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Registrering lyckades! Logga in nu.");
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  } catch (error) {
    alert(error.message);
  }
});

// Hantera inloggning
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location = "profile.html";
  } catch (error) {
    alert(error.message);
  }
});

// Kontrollera om användaren är inloggad
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userEmail = document.getElementById("user-email");
    if (userEmail) userEmail.textContent = user.email;
  } else if (window.location.pathname.includes("profile.html")) {
    window.location = "index.html";
  }
});

// Logga ut
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location = "index.html";
    });
  });
}
