gsap.defaults({
    ease: "power2.out"
});

const languageButtons = document.querySelectorAll(".language-grid-item");
let buttonTimelines = [];
let exitTime;

for (let languageButton of languageButtons) {
    let tl = gsap.timeline({
        paused: true
    })
    .to(languageButton, {
        scale: 1.2,
        filter: "brightness(1)",
        duration: 0.3
    })  // Entrance animation
    .addPause();
    exitTime = tl.duration();
    tl.to(languageButton, {
        scale: 1,
        filter: "brightness(0.5)",
        duration: 0.2
    });  // Exit animation
    buttonTimelines.push(tl);
}

// Runs a timeline that animates an element when it is hovered over.
function addHoverAnimation(tl, tlExitTime, element) {
    element.addEventListener("mouseenter", () => {
        if (tl.time() < tlExitTime) {
            tl.play();
        } else {
            tl.restart();
        }
    });
    element.addEventListener("mouseleave", () => {
        if (tl.time() < tlExitTime) {
            tl.reverse();
        } else {
            tl.play();
        }
    });
}

for (let i = 0; i < languageButtons.length; i++) {
    addHoverAnimation(buttonTimelines[i], exitTime, languageButtons[i]);
}

// Heading animation. Increases the font size of the headings on hover.
const headingSpans = document.querySelectorAll("#section-1 span");
for (let headingSpan of headingSpans) {
    let fontSizeAnim = gsap.timeline({
        paused: true
    })
    .to(headingSpan, {
        fontSize: "6rem",
        duration: 0.3
    })
    .addPause()
    .to(headingSpan, {
        fontSize: "5rem",
        duration: 0.3
    });
    addHoverAnimation(fontSizeAnim, 0.3, headingSpan);
}

// Animations for .language-section.
const languageSectionThemes = {
    "#python-section": {
        color: "white",
        backgroundColor: "#5f9fff"
    },
    "#js-section": {
        color: "black",
        backgroundColor: "#ffbb0f"
    },
    "#c-section": {
        color: "white",
        backgroundColor: "#1d55a9"
    },
    "#cpp-section": {
        color: "white",
        backgroundColor: "#093d89"
    },
    "#rust-section": {
        color: "white",
        backgroundColor: "#944b02"
    }
};

function getLanguageSectionAnimation(idName) {
    return gsap.timeline({
        paused: true
    })
    .to(idName.concat(" div div"), {
        scaleX: 1,
        duration: 0.3
    })
    .to(idName.concat(" div"), {
        color: languageSectionThemes[idName].color,
        duration: 0.3
    }, "<")
    .addPause()
    .to(idName.concat(" div div"), {
        translateX: "100%",
        duration: 0.3
    })
    .to(idName.concat(" div"), {
        color: "black",
        duration: 0.3
    }, "<");
}

for (const idName in languageSectionThemes) {
    gsap.set(idName.concat(" div div"), {
        backgroundColor: languageSectionThemes[idName].backgroundColor,
        transformOrigin: "left center",
        height: "100%",
        scaleX: 0
    });
    addHoverAnimation(getLanguageSectionAnimation(idName), 0.3, document.querySelector(idName));
}
