window.addEventListener('DOMContentLoaded', () => {
    getTotalHits();
    getTimeInZone('Asia/Jakarta', 'wib-time');
    getTimeInZone('Asia/Jayapura', 'wit-time');
});

function getTotalHits() {
    // Hitung total hit secara lokal (misalnya, dari penyimpanan lokal atau database)
    const totalHits = Math.floor(Math.random() * 1000); // Nilai acak antara 0 hingga 999
    document.getElementById('total-hits').textContent = totalHits;
}

function getTimeInZone(timezone, elementId) {
    const options = {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const time = new Date().toLocaleTimeString('en-US', options);
    document.getElementById(elementId).textContent = time;
}
