document.addEventListener("DOMContentLoaded", () => {
    // Variables modal
    const modal = document.getElementById("modalCreateProject");
    const openBtn = document.getElementById("openModal");
    const closeBtn = document.querySelector(".close-modal");
    const overlay = document.querySelector(".fond-opaque");

    // Variables setting
    const settingsBtn = document.querySelector(".icon-setting");
    const settingBars = document.querySelectorAll(".setting-bar");
    const cards = document.querySelectorAll(".card");

    // Variables thème
    const themeBtn = document.querySelector(".icon-theme");
    const body = document.body;

    let isActive = false;

    // Modal
    if (openBtn && modal) {
        openBtn.addEventListener("click", () => {
            modal.classList.add("active");
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    if (overlay && modal) {
        overlay.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    // Setting dashboard
    if (settingsBtn) {
        settingsBtn.addEventListener("click", () => {
    isActive = !isActive;

    settingBars.forEach(bar => {
        bar.classList.toggle("active", isActive);
    });

    cards.forEach(card => {
        card.classList.toggle("is-setting", isActive);
    });

    settingsBtn.classList.toggle("active", isActive);
});
    }

    // Appliquer le thème sauvegardé
    const savedTheme = localStorage.getItem("dashboard-theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    }

    // Toggle dark mode
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            body.classList.toggle("dark-mode");

            const isDark = body.classList.contains("dark-mode");
            localStorage.setItem("dashboard-theme", isDark ? "dark" : "light");

            themeBtn.classList.toggle("active", isDark);
        });

        // état visuel au chargement
        if (body.classList.contains("dark-mode")) {
            themeBtn.classList.add("active");
        }
    }
});