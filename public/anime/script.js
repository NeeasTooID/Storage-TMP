document.addEventListener("DOMContentLoaded", function() {
    // Sample anime data
    const animeList = [
        { id: 1, title: 'Naruto', genre: 'Action' },
        { id: 2, title: 'One Piece', genre: 'Adventure' },
        { id: 3, title: 'Attack on Titan', genre: 'Fantasy' },
        { id: 4, title: 'Death Note', genre: 'Mystery' },
        { id: 5, title: 'My Hero Academia', genre: 'Superhero' }
    ];

    const animeListContainer = document.getElementById('anime-list');

    // Populate anime list
    animeList.forEach(anime => {
        const animeItem = document.createElement('div');
        animeItem.classList.add('anime-item');
        animeItem.innerHTML = `
            <img class="anime-thumbnail" src="https://via.placeholder.com/50" alt="${anime.title}">
            <div class="anime-details">
                <h2 class="anime-title">${anime.title}</h2>
                <p class="anime-genre">${anime.genre}</p>
            </div>
        `;
        animeListContainer.appendChild(animeItem);
    });
});
