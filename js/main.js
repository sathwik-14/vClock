const menuIcon = document.getElementById("menuIcon");
console.log("hek")

menuIcon.addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("d-none");
    });