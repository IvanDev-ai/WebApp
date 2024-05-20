document.addEventListener("DOMContentLoaded", () => {
    const apiKey = 'e1981cc0008b4439bbcba721e74553e4';  // Reemplaza con tu propia API key
    const url = `https://newsapi.org/v2/everything?q=clima&language=es&apiKey=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            const articles = data.articles.slice(0, 8); // Limitar a los primeros 5 artículos

            articles.forEach(article => {
                const card = document.createElement('div');
                card.className = 'card';
                
                const img = document.createElement('img');
                img.src = article.urlToImage || 'default-image.jpg';
                card.appendChild(img);
                
                const title = document.createElement('h2');
                title.textContent = article.title;
                card.appendChild(title);
                
                const description = document.createElement('p');
                description.textContent = article.description;
                card.appendChild(description);
                
                const link = document.createElement('a');
                link.href = article.url;
                link.textContent = 'Leer más';
                card.appendChild(link);
                
                newsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching news:', error));
});


