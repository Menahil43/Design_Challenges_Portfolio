const navigation = document.querySelector(".navbar");
const menuButton = document.querySelector(".nav-toggle");
const navigationLinks = document.querySelector(".nav-links");

function closeNavigationMenu() {
    if (!menuButton || !navigationLinks) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    navigationLinks.classList.remove("is-open");
}

if (menuButton && navigationLinks) {
    menuButton.addEventListener("click", () => {
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!isExpanded));
        menuButton.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
        navigationLinks.classList.toggle("is-open", !isExpanded);
    });

    navigationLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeNavigationMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeNavigationMenu();
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (!target) return;

        event.preventDefault();
        const navHeight = navigation ? navigation.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({
            top: targetPosition,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    });
});
