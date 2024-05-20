const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}



const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


// Cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Obtener elementos del DOM
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

                const weatherContainer = document.getElementById("weatherContainer");
                weatherContainer.style.display = "flex";
            })
            .catch(error => {
                // Por si da error al hacer la solicitud 
                console.error('Error al obtener el clima:', error);
                const weatherResult = document.getElementById('weatherResult');
                weatherResult.innerHTML = '<p>Ocurrió un error al obtener el clima. Por favor, intenta nuevamente.</p>';
            });
    } else {
        // Alerta si no se escribe ninguna  ciudad
        alert('Por favor, introduce una ciudad.');
    }
}

// Función para alternar el modo oscuro
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode'); // Alternar la clase 'dark-mode' en el body, que hace que cambien todos, cambiando asi su bg-color y color

    // Esto sirve para alternar de color el bgcolor del body, ya que, al ser un degradado de bg-image en el css, lo de arriba no lo cambiaría.
    const darkModeOverlay = document.getElementById('darkModeOverlay');
    darkModeOverlay.style.opacity = body.classList.contains('dark-mode') ? '0.5' : '0';
}


// Función para abrir el pop-up
function openPopup() {
    document.getElementById('loginPopup').style.display = 'block';
}

// Función para cerrar el pop-up
function closePopup() {
    document.getElementById('loginPopup').style.display = 'none';
}

// Escucha el clic en el botón de login/register
document.getElementById('loginBtn').addEventListener('click', openPopup);




