document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '22c52c918e39d649fd5c2ee31528321e';
    const newsContainer = document.getElementById('newsContainer');

    fetch(`https://gnews.io/api/v4/top-headlines?lang=es&token=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            data.articles.slice(0, 8).forEach(article => {
                const card = createCard(article);
                newsContainer.appendChild(card);
            });
        })
        .catch(error => console.log('Error al obtener noticias:', error));

    function createCard(article) {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('h2');
        title.textContent = article.title;

        const image = document.createElement('img');
        image.src = article.image;
        image.alt = article.title;

        const description = document.createElement('p');
        description.textContent = article.description;

        const source = document.createElement('p');
        source.innerHTML = `Fuente: <a href="${article.url}" target="_blank">${article.source.name}</a>`;

        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(source);

        return card;
    }
});