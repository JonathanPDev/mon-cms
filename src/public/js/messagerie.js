document.addEventListener("DOMContentLoaded", () => {
    // Onglet contact de la page messagerie
    const contactTabs = Array.from(document.querySelectorAll(".btn-onglet-contact"));
    const contactPanel = Array.from(document.querySelectorAll(".contact-method-panel"));

    contactTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const targetClass = tab.dataset.contactTab;

            contactTabs.forEach((item) => item.classList.remove("active"));
            tab.classList.add("active");

            contactPanel.forEach((panel) => {
                panel.classList.remove("active");
                if (panel.classList.contains(targetClass)) {
                    panel.classList.add("active");
                }
            });
        })
    })

})