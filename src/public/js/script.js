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

    // Aside dashboard
    const dashboardMain = document.querySelector(".dashboard-main");
    const aside = document.querySelector(".aside-dashboard");
    const toggleAsideBtn = document.querySelector(".toggle-aside");

    const savedAsideState = localStorage.getItem("dashboard-aside-collapsed");

    if (savedAsideState === "true" && dashboardMain) {
        dashboardMain.classList.add("aside-collapsed");
    }

    if (toggleAsideBtn && dashboardMain) {
        toggleAsideBtn.addEventListener("click", () => {
            dashboardMain.classList.toggle("aside-collapsed");

            const isCollapsed = dashboardMain.classList.contains("aside-collapsed");
            localStorage.setItem("dashboard-aside-collapsed", isCollapsed);

            toggleAsideBtn.setAttribute(
                "aria-label",
                isCollapsed ? "Ouvrir l'aside" : "Fermer l'aside"
            );
        });
    }

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
    const mesProjet = document.querySelector(".mesProjet");
const mesProjetHandleY = document.querySelector(".mesProjet-resize-handle-y");

if (mesProjet && mesProjetHandleY) {
    const STORAGE_KEY = "mesProjetHeight";
    const MIN_HEIGHT = 300;
    const MAX_HEIGHT = 500;

    const savedHeight = localStorage.getItem(STORAGE_KEY);
    if (savedHeight) {
        mesProjet.style.setProperty("--mesprojet-height", savedHeight);
    }

    let isResizing = false;
    let startY = 0;
    let startHeight = 0;

    mesProjetHandleY.addEventListener("pointerdown", (e) => {
        isResizing = true;
        startY = e.clientY;
        startHeight = mesProjet.getBoundingClientRect().height;

        mesProjet.classList.add("is-resizing");
        mesProjetHandleY.setPointerCapture(e.pointerId);
    });

    mesProjetHandleY.addEventListener("pointermove", (e) => {
        if (!isResizing) return;

        const deltaY = e.clientY - startY;
        const nextHeight = Math.max(MIN_HEIGHT, Math.min(startHeight + deltaY, MAX_HEIGHT));

        mesProjet.style.setProperty("--mesprojet-height", `${nextHeight}px`);
    });

    const stopResize = () => {
        if (!isResizing) return;

        isResizing = false;
        mesProjet.classList.remove("is-resizing");

        const finalHeight = getComputedStyle(mesProjet).getPropertyValue("--mesprojet-height").trim();
        if (finalHeight) {
            localStorage.setItem(STORAGE_KEY, finalHeight);
        }
    };

    mesProjetHandleY.addEventListener("pointerup", stopResize);
    mesProjetHandleY.addEventListener("pointercancel", stopResize);
}
const grid = document.querySelector(".project-grid");
const btnGrid = document.querySelector(".btn-view-grid");
const btnList = document.querySelector(".btn-view-list");

const STORAGE_KEY_VIEW = "projectView";

// charger préférence
const savedView = localStorage.getItem(STORAGE_KEY_VIEW);
if (savedView === "list") {
    grid.classList.add("view-list");
    btnList?.classList.add("active");
    btnGrid?.classList.remove("active");
}

// click GRID
btnGrid?.addEventListener("click", () => {
    grid.classList.remove("view-list");

    btnGrid.classList.add("active");
    btnList.classList.remove("active");

    localStorage.setItem(STORAGE_KEY_VIEW, "grid");
});

// click LIST
btnList?.addEventListener("click", () => {
    grid.classList.add("view-list");

    btnList.classList.add("active");
    btnGrid.classList.remove("active");

    localStorage.setItem(STORAGE_KEY_VIEW, "list");
});
});