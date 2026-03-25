const modal = document.getElementById("modalCreateProject");
const openBtn = document.getElementById("openModal");
const closeBtn = document.querySelector(".close-modal");
const overlay = document.querySelector(".fond-opaque");

openBtn.addEventListener("click", () => {
    modal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

overlay.addEventListener("click", () => {
    modal.classList.remove("active");
});