// Sticky navigation - Ändrar färg vid scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar'); // Hämtar navbar
    if (window.scrollY > 50) { // Om scroll är större än 50px
        navbar.style.backgroundColor = '#000000'; // Solid svart bakgrund
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)'; // Lägger till skugga
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Halvtransparent
        navbar.style.boxShadow = 'none'; // Tar bort skugga
    }
});
