import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// Element från HTML
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const registerLink = document.getElementById("register-link");

// Växla mellan registrerings- och inloggningsformulär
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
    alert("Registrering lyckades! Logga in.");
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  } catch (error) {
    alert("Fel vid registrering: " + error.message);
  }
});

// Hantera inloggning
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Inloggning lyckades!");
    window.location = "profile.html";
  } catch (error) {
    alert("Fel vid inloggning: " + error.message);
  }
});

// Kontrollera om användaren är inloggad
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Användare inloggad:", user.email);
  } else {
    console.log("Ingen användare inloggad.");
  }
});
