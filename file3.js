// Обробник події для форми
document.getElementById('signup-form').addEventListener('submit', function (event) {
    // Забороняємо стандартну поведінку форми (оновлення сторінки)
    event.preventDefault();

    // Отримуємо значення полів вводу
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    // Регулярний вираз для перевірки імені користувача (обов’язково латинські літери + цифри, мінімум 5 символів)
    const usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;

    // Регулярний вираз для перевірки пароля (мінімум 8 символів, латиниця, цифри, спеціальні символи)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

    // Поле для виведення помилок
    const errorMessage = document.getElementById('signup-error-message');

    // Скидаємо попереднє повідомлення про помилки
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';

    // Флаг для перевірки валідності
    let isValid = true;

    // Перевіряємо правильність введення імені користувача
    if (!usernameRegex.test(username)) {
        // Виводимо помилку, якщо ім'я користувача не відповідає вимогам
        errorMessage.textContent = "Ім'я користувача має містити мінімум 5 символів і включати обов'язково латинські літери та цифри.";
        errorMessage.style.display = 'block';
        isValid = false; // Логін не валідний
    }

    // Перевіряємо правильність введення пароля
    if (!passwordRegex.test(password)) {
        // Виводимо помилку, якщо пароль не відповідає вимогам
        errorMessage.textContent = "Пароль має містити мінімум 8 символів, включаючи латиницю, цифри та спеціальні символи.";
        errorMessage.style.display = 'block';
        isValid = false; // Пароль не валідний
    }

    // Якщо всі дані валідні
    if (isValid) {
        alert("Успішна реєстрація!");

        // Очищуємо поля форми
        document.getElementById('signup-username').value = '';
        document.getElementById('signup-password').value = '';

        // Ховаємо повідомлення про помилки
        errorMessage.style.display = 'none';
    }
});

// Функція для перемикання видимості пароля
function toggleSignupPassword() {
    // Отримуємо елемент пароля
    const passwordField = document.getElementById('signup-password');
    const toggleIcon = document.querySelector('.toggle-password i');

    // Перевіряємо тип поля пароля та перемикаємо
    if (passwordField.type === 'password') {
        passwordField.type = 'text'; // Відображаємо пароль
        toggleIcon.classList.remove('fa-eye'); // Змінюємо іконку
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password'; // Ховаємо пароль
        toggleIcon.classList.remove('fa-eye-slash'); // Змінюємо іконку
        toggleIcon.classList.add('fa-eye');
    }
}
