// Importar las funciones necesarias de los SDKs de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
// TODO: Añadir los SDKs de los productos de Firebase que desees utilizar
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuración de Firebase para tu aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyC2EvEB_FtI6AuhuyCCkMBGGXLqnjGHhdM",
  authDomain: "ab-web-a9a7d.firebaseapp.com",
  projectId: "ab-web-a9a7d",
  storageBucket: "ab-web-a9a7d.appspot.com",
  messagingSenderId: "573866742644",
  appId: "1:573866742644:web:328c4d75a42fc33fd89221"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Registro de nuevos usuarios
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Usuario registrado correctamente
      const user = userCredential.user;
      alert("¡Cuenta creada!");
      document.getElementById('registerForm').style.display = 'none';
      document.getElementById('popupTitle').innerText = `Bienvenido, ${email}`;
      document.getElementById('welcomeMessage').style.display = 'block';
    })
    .catch((error) => {
      // Manejo de errores durante el registro
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// Inicio de sesión de usuarios existentes
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // El usuario inició sesión correctamente
      const user = userCredential.user;
      alert("¡Inicio de sesión exitoso!");
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('popupTitle').innerText = `Bienvenido, ${email}`;
      document.getElementById('welcomeMessage').style.display = 'block';
    })
    .catch((error) => {
      // Manejo de errores durante el inicio de sesión
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("¡Ese usuario no existe, regístrate primero!");
    });
});
