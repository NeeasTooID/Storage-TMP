async function getRandomImage(category) {
    try {
        const response = await fetch(`/api/nsfw?category=${category}`);
        const data = await response.json();
        if (data.error) {
            alert(data.error);
        } else {
            window.open(data.url, '_blank');
        }
    } catch (error) {
        console.error('Failed to fetch random image:', error);
        alert('Failed to fetch random image. Please try again later.');
    }
}
