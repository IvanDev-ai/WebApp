  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC2EvEB_FtI6AuhuyCCkMBGGXLqnjGHhdM",
    authDomain: "ab-web-a9a7d.firebaseapp.com",
    projectId: "ab-web-a9a7d",
    storageBucket: "ab-web-a9a7d.appspot.com",
    messagingSenderId: "573866742644",
    appId: "1:573866742644:web:328c4d75a42fc33fd89221"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Registro
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          alert("Cuenta Creada!");
          document.getElementById('registerForm').style.display = 'none';
          document.getElementById('popupTitle').innerText = `Bienvenido, ${email}`;
          document.getElementById('welcomeMessage').style.display = 'block';
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
      });
});

// Inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          alert("Inicio de sesión exitoso!");
          document.getElementById('loginForm').style.display = 'none';
          document.getElementById('popupTitle').innerText = `Bienvenido, ${email}`;
          document.getElementById('welcomeMessage').style.display = 'block';
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Ese usuario no existe, registrese primero !");
      });
});
