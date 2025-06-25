gsap.defaults({
    ease: "power2.out"
});

// ========================================================
// Animations for the language grid items.
const languageButtons = document.querySelectorAll(".language-grid-item");
let buttonTimelines = [];
let exitTime;

for (let languageButton of languageButtons) {
    let tl = gsap.timeline({
        paused: true
    })
    .set(languageButton, {
        zIndex: 98  // Move the button to the front
    })
    .to(languageButton, {
        scale: 1.2,
        filter: "brightness(1)",
        outline: "7px solid white",
        boxShadow: "0 0 20px 5px white",
        duration: 0.3
    })  // Entrance animation
    .addPause();
    exitTime = tl.duration();
    tl.to(languageButton, {
        scale: 1,
        filter: "brightness(0.5)",
        outline: "0px solid white",
        boxShadow: "0 0 0px 0px white",
        duration: 0.2
    })  // Exit animation
    .set(languageButton, {
        zIndex: 0  // Move the button to the back when the animation is over.
    });
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

// ========================================================
// Heading animation. Increases the font size of the headings on hover.
const headingSpans = document.querySelectorAll("#section-1 span");
for (let headingSpan of headingSpans) {
    let fontSizeAnim = gsap.timeline({
        paused: true
    })
    .to(headingSpan, {
        fontSize: "6vw",
        duration: 0.3
    })
    .addPause()
    .to(headingSpan, {
        fontSize: "5vw",
        duration: 0.3
    });
    addHoverAnimation(fontSizeAnim, 0.3, headingSpan);
}

// =======================================================
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


// =======================================================
// Animations for the chart columns.
const chartColumns = document.querySelectorAll("#table td");
for (let chartColumn of chartColumns) {
    let bgColor = chartColumn.style["background-color"];
    let chartColumnAnim = gsap.timeline({
        paused: true
    })
    .to(chartColumn, {
        backgroundColor: "var(--main-color-dark)",
        outline: "5px solid white",
        duration: 0.3
    })
    .addPause()
    .to(chartColumn, {
        backgroundColor: bgColor,
        outline: "0px solid white",
        duration: 0.3
    });
    addHoverAnimation(chartColumnAnim, 0.3, chartColumn);
}