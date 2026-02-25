const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      display.textContent = "";
    } else if (value === "⌫") {
      display.textContent = display.textContent.slice(0, -1);
    } else if (value === "=") {
      try {
        display.textContent = eval(display.textContent);
      } catch {
        display.textContent = "Error";
      }
    } else {
      display.textContent += value;
    }
  });
});
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
    display.textContent += key;
  } else if (key === "Enter") {
    try {
      display.textContent = eval(display.textContent);
    } catch {
      display.textContent = "Error";
    }
  } else if (key === "Backspace") {
    display.textContent = display.textContent.slice(0, -1);
  } else if (key === "Escape") {
    display.textContent = "";
  }
});
