// ===== Обробка форми контактів =====
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");

// Якщо ім'я вже збережене в localStorage – підставляємо його у форму
try {
    const savedName = localStorage.getItem("visitorName");
    if (savedName) nameInput.value = savedName;
} catch (e) { /* localStorage недоступний */ }

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Перевірка заповненості полів
    if (!name || !email || !message) {
        alert("Будь ласка, заповніть усі поля!");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Невірний формат email!");
        return;
    }

    alert("Дякую, " + name + "! Ваше повідомлення надіслано.");
    console.log("Дані форми:", { name, email, message });

    try { localStorage.setItem("visitorName", name); } catch (e) {}
    document.getElementById("message").value = "";
});

// ===== Перемикач теми =====
const themeBtn = document.getElementById("themeBtn");

function applyTheme(dark) {
    document.body.classList.toggle("dark", dark);
    themeBtn.textContent = dark ? "☀️ Світла тема" : "🌙 Темна тема";
}

let darkTheme = false;
try { darkTheme = localStorage.getItem("theme") === "dark"; } catch (e) {}
applyTheme(darkTheme);

themeBtn.addEventListener("click", () => {
    darkTheme = !darkTheme;
    applyTheme(darkTheme);
    try { localStorage.setItem("theme", darkTheme ? "dark" : "light"); } catch (e) {}
});

// ===== Лічильник переглядів =====
let visits = 1;
try {
    visits = Number(localStorage.getItem("visits") || 0) + 1;
    localStorage.setItem("visits", visits);
} catch (e) {}
document.getElementById("visits").textContent = "Ви відвідали цю сторінку " + visits + " раз(и)";
