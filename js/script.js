// Obtener los elementos del DOM para el menú hamburguesa y el menú de navegación
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Agregar un evento de clic al menú hamburguesa
hamburger.addEventListener("click", mobileMenu);

// Función para alternar el menú de navegación en dispositivos móviles
function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

// Obtener todos los enlaces de navegación
const navLink = document.querySelectorAll(".nav-link");

// Agregar un evento de clic a cada enlace de navegación
navLink.forEach(n => n.addEventListener("click", closeMenu));

// Función para cerrar el menú de navegación
function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

// Ejecutar el código cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Obtener elementos del DOM para la barra de búsqueda y el contenedor de clima
    const searchBar = document.getElementById("searchBar");
    const weatherContainer = document.getElementById("weatherContainer");

    // Ocultar el contenedor de clima al inicio
    weatherContainer.style.display = "none";
});

// Función para buscar el clima
function buscarClima() {
    // Obtener el valor de la ciudad ingresada por el usuario
    const ciudad = document.getElementById('cityInput').value;
    if (ciudad) {
        // URL de la API para obtener el clima
        const apiKey = '96cf0172202e4b5f875154310242104'; 
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${ciudad}&days=3`;

        // Realizar la solicitud a la API
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Obtener datos del clima actual y pronóstico
                const currentWeather = data.current;
                const forecast = data.forecast.forecastday.slice(0, 3); // Pronóstico para los próximos 3 días

                // Mostrar el clima actual
                const weatherResult = document.getElementById('weatherResult');
                weatherResult.innerHTML = `
                    <h2>Clima en ${ciudad}</h2>
                    <p>Temperatura actual: ${currentWeather.temp_c}°C</p>
                    <p>Condiciones actuales: ${currentWeather.condition.text}</p>
                `;

                // Mostrar el pronóstico para los próximos 3 días
                weatherResult.innerHTML += '<h3>Pronóstico para los próximos 3 días:</h3>';
                forecast.forEach(day => {
                    weatherResult.innerHTML += `
                        <table class="forecast-table">
                            <tr>
                                <th>Fecha</th>
                                <th>Máxima</th>
                                <th>Mínima</th>
                                <th>Condiciones</th>
                            </tr>
                            <tr>
                                <td>${day.date}</td>
                                <td>${day.day.maxtemp_c}°C</td>
                                <td>${day.day.mintemp_c}°C</td>
                                <td>${day.day.condition.text}</td>
                            </tr>
                        </table>
                    `;
                });

                // Mostrar el contenedor de clima
                const weatherContainer = document.getElementById("weatherContainer");
                weatherContainer.style.display = "flex";
            })
            .catch(error => {
                // Manejar errores al hacer la solicitud
                console.error('Error al obtener el clima:', error);
                const weatherResult = document.getElementById('weatherResult');
                weatherResult.innerHTML = '<p>Ocurrió un error al obtener el clima. Por favor, intenta nuevamente.</p>';
            });
    } else {
        // Mostrar una alerta si no se ingresó ninguna ciudad
        alert('Por favor, introduce una ciudad.');
    }
}

// Función para alternar el modo oscuro
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode'); // Alternar la clase 'dark-mode' en el body

    // Alternar la opacidad del overlay para el modo oscuro
    const darkModeOverlay = document.getElementById('darkModeOverlay');
    darkModeOverlay.style.opacity = body.classList.contains('dark-mode') ? '0.5' : '0';
}

// Función para abrir el pop-up de inicio de sesión/registro
function openPopup() {
    document.getElementById('loginPopup').style.display = 'block';
}

// Función para cerrar el pop-up de inicio de sesión/registro
function closePopup() {
    document.getElementById('loginPopup').style.display = 'none';
}

// Escuchar el clic en el botón de login/register
document.getElementById('loginBtn').addEventListener('click', openPopup);

// Alternar entre el formulario de registro y el de inicio de sesión
document.getElementById('switchToLogin').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('popupTitle').innerText = 'Iniciar Sesión';
});

document.getElementById('switchToRegister').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('popupTitle').innerText = 'Regístrate!';
});
