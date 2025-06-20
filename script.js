const buttons = document.querySelectorAll("#about-us-buttons button");
buttons[0].style.backgroundColor = "#055f5a";  // Default button styling

function resetButtons() {
    for (let button of buttons) {
        button.style.backgroundColor = "#1f4947";
    }
}

for (let button of buttons) {
    button.addEventListener("click", () => {
        resetButtons();
        button.style.backgroundColor = "#055f5a";
    });
}