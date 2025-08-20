// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_pLv78BHm6a7LWH4vyQYyp4xwUArV6SM",
    authDomain: "f1-hub-d46bf.firebaseapp.com",
    projectId: "f1-hub-d46bf",
    storageBucket: "f1-hub-d46bf.firebasestorage.app",
    messagingSenderId: "731892543238",
    appId: "1:731892543238:web:de7ad915f4031476fc7887",
    measurementId: "G-RDP5XVD7SV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


const loginButton = document.getElementById("loginButton"); // match the HTML id
loginButton.addEventListener("click", function (event) {
    event.preventDefault();
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    errorDiv.textContent = '';
    signInWithEmailAndPassword(auth, emailInput, passwordInput)
      .then((userCredential) => {
        errorDiv.textContent = "Login successful! Redirecting to homepage...";
        errorDiv.classList.remove('text-red-600');
        errorDiv.classList.add('text-green-600');
        setTimeout(() => {
          window.location.href = "homepage.html";
        }, 1200);
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          errorDiv.textContent = "Incorrect password. Please try again.";
        } else if (error.code === 'auth/user-not-found') {
          errorDiv.textContent = "No account found with this email.";
        } else {
          errorDiv.textContent = error.message;
        }
        errorDiv.classList.remove('text-green-600');
        errorDiv.classList.add('text-red-600');
      });
});
