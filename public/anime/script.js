document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("welcomeMessage").style.display = "block";
});

document.getElementById('anime').addEventListener('click', function() {
  document.getElementById('content').innerHTML = '<h2>Anime</h2><p>Daftar anime akan ditampilkan di sini.</p>';
  document.getElementById('welcomeMessage').style.display = 'none'; // Menyembunyikan pesan sambutan
});

document.getElementById('waifu').addEventListener('click', function() {
  document.getElementById('content').innerHTML = '';
  document.getElementById('menuList').style.display = 'block';
  document.getElementById('menuWaifu').innerHTML = '<h3>Waifu Random</h3>';
  for (let i = 0; i < 5; i++) {
    document.getElementById('menuWaifu').innerHTML += '<li>Waifu ' + (i + 1) + '</li>';
  }
  document.getElementById('welcomeMessage').style.display = 'none'; // Menyembunyikan pesan sambutan
});

document.getElementById('maid').addEventListener('click', function() {
  document.getElementById('content').innerHTML = '';
  document.getElementById('menuList').style.display = 'block';
  document.getElementById('menuMaid').innerHTML = '<h3>Maid Random</h3>';
  for (let i = 0; i < 5; i++) {
    document.getElementById('menuMaid').innerHTML += '<li>Maid ' + (i + 1) + '</li>';
  }
  document.getElementById('welcomeMessage').style.display = 'none'; // Menyembunyikan pesan sambutan
});
