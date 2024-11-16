// Функція для перемикання видимості пароля
function togglePassword() {
    // Отримуємо елемент поля пароля за його ID
    const p = document.getElementById("password");
    // Знаходимо іконку для перемикання видимості пароля
    const eyeIcon = document.querySelector(".toggle-password i");

    // Перевіряємо, чи поле пароля у форматі "password"
    if (p.type === "password") {
        p.type = "text"; // Змінюємо тип поля на "text" для відображення пароля
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash"); // Замінюємо іконку на "закрите око"
        eyeIcon.style.color = "#003f5c"; // Змінюємо колір іконки
    } else {
        p.type = "password"; // Змінюємо тип поля на "password" для приховування пароля
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye"); // Замінюємо іконку на "відкрите око"
        eyeIcon.style.color = "#5f9ea0"; // Відновлюємо колір іконки
    }
}

// Функція для перевірки коректності введених даних у формі
function validateForm(event) {
    event.preventDefault(); // Запобігаємо стандартному відправленню форми

    // Отримуємо значення полів логіна та пароля
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // Отримуємо елемент для відображення повідомлень про помилки
    const errorMessage = document.getElementById("error-message");

    // Регулярний вираз для перевірки логіна
    const usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
    // Логін має містити мінімум 5 символів, латинські букви та цифри

    // Регулярний вираз для перевірки пароля
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    // Пароль має містити мінімум 8 символів, латинські букви, цифри та спеціальні символи

    // Перевіряємо чи поле "Ім'я користувача" порожнє
    if (!username) {
        errorMessage.textContent = "Поле 'Ім'я користувача' не може бути порожнім.";
        errorMessage.style.display = "block"; // Відображаємо повідомлення про помилку
    } 
    // Перевіряємо чи логін відповідає регулярному виразу
    else if (!usernameRegex.test(username)) {
        errorMessage.textContent = "Логін повинен містити мінімум 5 символів, включаючи латинські букви та цифри.";
        errorMessage.style.display = "block"; // Відображаємо повідомлення про помилку
    } 
    // Перевіряємо чи поле "Пароль" порожнє
    else if (!password) {
        errorMessage.textContent = "Поле 'Пароль' не може бути порожнім.";
        errorMessage.style.display = "block"; // Відображаємо повідомлення про помилку
    } 
    // Перевіряємо чи пароль відповідає регулярному виразу
    else if (!passwordRegex.test(password)) {
        errorMessage.textContent = "Пароль повинен містити мінімум 8 символів, включаючи латинські букви, цифри та спеціальні символи. Кириличні символи не допускаються.";
        errorMessage.style.display = "block"; // Відображаємо повідомлення про помилку
    } 
    // Якщо всі перевірки успішні
    else {
        errorMessage.style.display = "none"; // Приховуємо повідомлення про помилку

        // Виводимо повідомлення про успішний вхід
        if (confirm("Успішний вхід!")) {
            location.reload(); // Перезавантажуємо сторінку
        }
    }
}

// Додаємо обробник події для форми
document.getElementById("login-form").addEventListener("submit", validateForm);
// При натисканні кнопки "Увійти" буде виконуватися функція validateForm
