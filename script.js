document.addEventListener("DOMContentLoaded", function() {
    const searchBar = document.getElementById("searchBar");
    const weatherContainer = document.getElementById("weatherContainer");

    // Centrar la barra de búsqueda en la mitad de la pantalla
    searchBar.style.top = "40%";
    searchBar.style.transform = "translateY(-50%)";
    searchBar.style.left = "50%";
    searchBar.style.transform += "translateX(-50%)";

    // Ocultar el contenedor de clima
    weatherContainer.style.display = "none";
});

function buscarClima() {
    const ciudad = document.getElementById('cityInput').value;
    if (ciudad) {
        const apiKey = '96cf0172202e4b5f875154310242104'; // Coloca tu API key de WeatherAPI.com
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ciudad}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const weatherData = data.current;
                const weatherResult = document.getElementById('weatherResult');
                weatherResult.innerHTML = `
                    <h2>Clima en ${ciudad}</h2>
                    <p>Temperatura: ${weatherData.temp_c}°C</p>
                    <p>Condiciones: ${weatherData.condition.text}</p>
                `;

                // Mostrar el contenedor de clima y mantener la barra de búsqueda en la parte superior
                const searchBar = document.getElementById("searchBar");
                const weatherContainer = document.getElementById("weatherContainer");
                searchBar.style.top = "20px"; // Posicionar la barra de búsqueda a 20px del borde superior
                searchBar.style.transform = "translateY(0)";
                searchBar.style.left = "50%";
                searchBar.style.transform += "translateX(-50%)";
                weatherContainer.style.display = "flex";
            })
            .catch(error => {
                console.error('Error al obtener el clima:', error);
                const weatherResult = document.getElementById('weatherResult');
                weatherResult.innerHTML = '<p>Ocurrió un error al obtener el clima. Por favor, intenta nuevamente.</p>';
            });
    } else {
        alert('Por favor, introduce una ciudad.');
    }
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Mostrar u ocultar el overlay oscuro dependiendo del modo
    const darkModeOverlay = document.getElementById('darkModeOverlay');
    darkModeOverlay.style.opacity = body.classList.contains('dark-mode') ? '0.5' : '0';
}
