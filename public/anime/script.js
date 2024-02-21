document.addEventListener("DOMContentLoaded", function() {
    // Sample anime data
    const animeList = [
        { id: 1, title: 'Nama Waifu Random', genre: 'Action' },
        { id: 2, title: 'N Random', genre: 'Adventure' },
        { id: 3, title: 'N Random', genre: 'Fantasy' },
        { id: 4, title: 'N Random', genre: 'Mystery' },
        { id: 5, title: 'Loli Random', genre: 'Superhero' }
    ];

    const animeListContainer = document.getElementById('anime-list');

    // Populate anime list with buttons
    animeList.forEach(anime => {
        const animeButton = document.createElement('button');
        animeButton.classList.add('anime-button');
        animeButton.textContent = anime.title;
        animeButton.setAttribute('data-genre', anime.genre);
        animeButton.addEventListener('click', function() {
            // Handle button click event here
            console.log(`Clicked on button with title: ${anime.title}`);
        });
        animeListContainer.appendChild(animeButton);
    });

    // Change heading text to "Button List"
    document.querySelector('h1').textContent = 'Button List';
});
