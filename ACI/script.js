const hamburgerIcon = document.getElementById('hamburger-icon')

hamburgerIcon.addEventListener('click', toggleMenu())

function toggleMenu() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("show");
}
