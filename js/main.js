const toggle = document.getElementById("nav-toggle");
const navList = document.getElementById("nav-list");

toggle.addEventListener("click", () => {
    navList.classList.toggle("active");
});
