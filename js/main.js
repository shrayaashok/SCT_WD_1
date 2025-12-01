// MOBILE MENU TOGGLE
const toggle = document.getElementById("nav-toggle");
const navList = document.getElementById("nav-list");

toggle.addEventListener("click", () => {
    navList.classList.toggle("active");
});

// NAVBAR CHANGE ON SCROLL
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
