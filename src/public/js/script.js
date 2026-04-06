document.addEventListener("DOMContentLoaded", () => {
    // Variables modal
    const modal = document.getElementById("modalCreateProject");
    const openBtn = document.getElementById("openModal");
    const closeBtn = document.querySelector(".close-modal");
    const overlay = document.querySelector(".fond-opaque");

    // Variables setting - remplacement
    const cardMenuTriggers = document.querySelectorAll(".card-menu-trigger");
    const settingBars = document.querySelectorAll(".setting-bar");
    const cards = document.querySelectorAll(".card");

    // Variables thème
    const themeBtns = document.querySelectorAll(".icon-theme");
    const body = document.body;


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

    // Setting dashboard : une seule carte ouverte à la fois
    cardMenuTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.stopPropagation();

            const currentCard = trigger.closest(".card");
            const currentMenu = trigger.closest(".card-menu");
            const currentBar = currentMenu?.querySelector(".setting-bar");

            if (!currentBar) return;

            const isAlreadyOpen = currentBar.classList.contains("active");

            // ferme tout
            settingBars.forEach(bar => bar.classList.remove("active"));
            cardMenuTriggers.forEach(btn => btn.classList.remove("active"));
            cards.forEach(card => card.classList.remove("is-setting"));

            // rouvre seulement la carte cliquée
            if (!isAlreadyOpen) {
                currentBar.classList.add("active");
                trigger.classList.add("active");
                currentCard?.classList.add("is-setting");
            }
        });
    });

    // Empêche la fermeture quand on clique dans la barre
    settingBars.forEach(bar => {
        bar.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    });

    // Clique ailleurs = fermeture
    document.addEventListener("click", () => {
        settingBars.forEach(bar => bar.classList.remove("active"));
        cardMenuTriggers.forEach(btn => btn.classList.remove("active"));
        cards.forEach(card => card.classList.remove("is-setting"));
    });

    // Appliquer le thème sauvegardé
    const savedTheme = localStorage.getItem("dashboard-theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    }

    // Toggle dark mode
    themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("dashboard-theme", isDark ? "dark" : "light");

        // sync visuel sur tous les boutons
        themeBtns.forEach(b => b.classList.toggle("active", isDark));
    });
});
    const mesProjet = document.querySelector(".mesProjet");
    const mesProjetHandleY = document.querySelector(".mesProjet-resize-handle-y");

    if (mesProjet && mesProjetHandleY) {
        const STORAGE_KEY = "mesProjetHeight";
        const MIN_HEIGHT = 310;
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

if (grid) {
    const savedView = localStorage.getItem(STORAGE_KEY_VIEW);

    if (savedView === "list") {
        grid.classList.add("view-list");
        btnList?.classList.add("active");
        btnGrid?.classList.remove("active");
    }

    btnGrid?.addEventListener("click", () => {
        grid.classList.remove("view-list");

        btnGrid.classList.add("active");
        btnList.classList.remove("active");

        localStorage.setItem(STORAGE_KEY_VIEW, "grid");
    });

    btnList?.addEventListener("click", () => {
        grid.classList.add("view-list");

        btnList.classList.add("active");
        btnGrid.classList.remove("active");

        localStorage.setItem(STORAGE_KEY_VIEW, "list");
    });
}
    const btnMenu = document.querySelector(".mobile-open-aside");
    const closeAsideBtn = document.querySelector(".closed-aside");

    btnMenu?.addEventListener("click", () => {
        dashboardMain.classList.add("mobile-aside-open");
    });

    closeAsideBtn?.addEventListener("click", () => {
        dashboardMain.classList.remove("mobile-aside-open");
    });
    const mobileMore = document.querySelector(".mobile-more");
    const ellipsisBtn = document.querySelector(".icon-ellipsis");

    ellipsisBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileMore?.classList.toggle("is-open");
    });

    document.addEventListener("click", (e) => {
        if (!mobileMore?.contains(e.target)) {
            mobileMore?.classList.remove("is-open");
        }
    });
});