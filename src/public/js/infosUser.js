document.addEventListener("DOMContentLoaded", () => {
    /* =========================
       SLIDER CARTES BANCAIRES
    ========================= */
    const track = document.querySelector(".cb-track");
    const cards = Array.from(document.querySelectorAll(".cb-card"));
    const prevBtn = document.querySelector(".cb-nav-prev");
    const nextBtn = document.querySelector(".cb-nav-next");
    const dots = Array.from(document.querySelectorAll(".cb-slider-dots .dot"));

    let currentIndex = 0;

    function updateSlider(index) {
        if (!track || cards.length === 0) return;

        currentIndex = Math.max(0, Math.min(index, cards.length - 1));

        const card = cards[currentIndex];
        track.scrollTo({
            left: card.offsetLeft - track.offsetLeft,
            behavior: "smooth"
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });

        cards.forEach((cardItem, i) => {
            cardItem.classList.toggle("is-active", i === currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            const nextIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
            updateSlider(nextIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            const nextIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
            updateSlider(nextIndex);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            updateSlider(index);
        });
    });

    if (track && cards.length > 0) {
        track.addEventListener("scroll", () => {
            let closestIndex = 0;
            let closestDistance = Infinity;

            cards.forEach((card, index) => {
                const distance = Math.abs(track.scrollLeft - (card.offsetLeft - track.offsetLeft));
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === closestIndex);
            });

            cards.forEach((cardItem, i) => {
                cardItem.classList.toggle("is-active", i === closestIndex);
            });

            currentIndex = closestIndex;
        });

        updateSlider(0);
    }

    /* =========================
       ONGLETS ABONNEMENT
    ========================= */
    const tabs = Array.from(document.querySelectorAll(".onglet li"));
    const panels = Array.from(document.querySelectorAll(".payment-panel"));

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const targetClass = tab.dataset.tab;

            tabs.forEach((item) => item.classList.remove("active"));
            tab.classList.add("active");

            panels.forEach((panel) => {
                panel.classList.remove("active");
                if (panel.classList.contains(targetClass)) {
                    panel.classList.add("active");
                }
            });
        });
    });
    const paymentTabs = Array.from(document.querySelectorAll(".btn-onglet-paiement"));
    const paymentPanels = Array.from(document.querySelectorAll(".payment-method-panel"));

    paymentTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const targetClass = tab.dataset.paymentTab;

            paymentTabs.forEach((item) => item.classList.remove("active"));
            tab.classList.add("active");

            paymentPanels.forEach((panel) => {
                panel.classList.remove("active");
                if (panel.classList.contains(targetClass)) {
                    panel.classList.add("active");
                }
            });
        });
    });
});