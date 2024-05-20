// Ejecutar el código cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '22c52c918e39d649fd5c2ee31528321e'; // Clave de la API de GNews
    const newsContainer = document.getElementById('newsContainer'); // Contenedor donde se mostrarán las noticias

    // Realizar la solicitud a la API de GNews para obtener las principales noticias
    fetch(`https://gnews.io/api/v4/top-headlines?lang=es&token=${apiKey}`)
        .then(response => response.json()) // Convertir la respuesta a formato JSON
        .then(data => {
            // Recorrer los primeros 8 artículos obtenidos
            data.articles.slice(0, 8).forEach(article => {
                // Crear una tarjeta para cada artículo y añadirla al contenedor de noticias
                const card = createCard(article);
                newsContainer.appendChild(card);
            });
        })
        .catch(error => console.log('Error al obtener noticias:', error)); // Manejar errores en la solicitud

    // Función para crear una tarjeta con la información del artículo
    function createCard(article) {
        const card = document.createElement('div'); // Crear un div para la tarjeta
        card.classList.add('card'); // Añadir la clase 'card' al div

        const title = document.createElement('h2'); // Crear un elemento h2 para el título
        title.textContent = article.title; // Establecer el texto del título

        const image = document.createElement('img'); // Crear un elemento img para la imagen
        image.src = article.image; // Establecer la fuente de la imagen
        image.alt = article.title; // Establecer el texto alternativo de la imagen

        const description = document.createElement('p'); // Crear un elemento p para la descripción
        description.textContent = article.description; // Establecer el texto de la descripción

        const source = document.createElement('p'); // Crear un elemento p para la fuente
        source.innerHTML = `Fuente: <a href="${article.url}" target="_blank">${article.source.name}</a>`; // Añadir un enlace a la fuente del artículo

        // Añadir los elementos creados a la tarjeta
        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(source);

        return card; // Devolver la tarjeta creada
    }
});
