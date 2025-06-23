const languageButtons = document.querySelectorAll(".language-grid-item");
for (let languageButton of languageButtons) {
    languageButton.addEventListener("mouseenter", () => {
        gsap.to(languageButton, {scale: 1.1, duration: 0.3, ease: "power2.out"})
    });
    languageButton.addEventListener("mouseleave", () => {
        gsap.to(languageButton, {scale: 1, duration: 0.3, ease: "power2.out"})
    });
}
