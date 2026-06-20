const display = document.getElementById("display");

// Button Click Events
document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", () => {
        display.value += button.textContent;
    });
});

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => {
        let operator = button.textContent;

        if (operator === "×") operator = "*";
        if (operator === "÷") operator = "/";
        if (operator === "−") operator = "-";

        display.value += operator;
    });
});

// Clear
document.querySelector(".clear").addEventListener("click", () => {
    display.value = "";
});

// Backspace
document.querySelector(".backspace").addEventListener("click", () => {
    display.value = display.value.slice(0, -1);
});

// Calculate
document.querySelector(".equal").addEventListener("click", () => {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
});

// Keyboard Support
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if ("0123456789+-*/.".includes(key)) {
        display.value += key;
    } else if (key === "Enter") {
        try {
            display.value = eval(display.value);
        } catch {
            display.value = "Error";
        }
    } else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    } else if (key === "Escape") {
        display.value = "";
    }
});