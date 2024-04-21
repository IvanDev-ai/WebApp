// Cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Obtener elementos del DOM
    const searchBar = document.getElementById("searchBar");
    const weatherContainer = document.getElementById("weatherContainer");

    // Centrar la barra de búsqueda verticalmente en la mitad de la pantalla
    searchBar.style.top = "40%"; 
    searchBar.style.transform = "translateY(-50%)"; 
    // Centrar la barra de búsqueda horizontalmente en la pantalla
    searchBar.style.left = "50%"; 
    searchBar.style.transform += "translateX(-50%)";

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

                // Mostrar el contenedor de clima y ajustar la posición de la barra de búsqueda
                const searchBar = document.getElementById("searchBar");
                const weatherContainer = document.getElementById("weatherContainer");
                searchBar.style.top = "20px"; 
                searchBar.style.transform = "translateY(0)";
                searchBar.style.left = "50%";
                searchBar.style.transform += "translateX(-50%)";
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
