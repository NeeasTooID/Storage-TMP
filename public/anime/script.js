document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("welcomeMessage").style.display = "block";
});

document.getElementById('anime').addEventListener('click', function() {
  document.getElementById('content').innerHTML = ''; // Mengosongkan konten
  document.getElementById('welcomeMessage').style.display = 'none'; // Menyembunyikan pesan sambutan
});

document.getElementById('waifu').addEventListener('click', function() {
  document.getElementById('content').innerHTML = ''; // Mengosongkan konten
  document.getElementById('menuList').style.display = 'block';
  document.getElementById('menuWaifu').innerHTML = '<h3>Waifu Random</h3>';
  for (let i = 0; i < 5; i++) {
    document.getElementById('menuWaifu').innerHTML += '<li>Waifu ' + (i + 1) + '</li>';
  }
  document.getElementById('welcomeMessage').style.display = 'none'; // Menyembunyikan pesan sambutan
});

document.getElementById('maid').addEventListener('click', function() {
  document.getElementById('content').innerHTML = ''; // Mengosongkan konten
  document.getElementById('menuList').style.display = 'block';
  document.getElementById('menuMaid').innerHTML = '<h3>Maid Random</h3>';
  for (let i = 0; i < 5; i++) {
    document.getElementById('menuMaid').innerHTML += '<li>Maid ' + (i + 1) + '</li>';
  }
  document.getElementById('welcomeMessage').style.display = 'none'; // Menyembunyikan pesan sambutan
});
