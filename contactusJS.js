// Додаємо слухач подій для форми при натисканні на кнопку "submit"
document.getElementById("contactForm").addEventListener("submit", function (event) {
    // Отримуємо поля форми та елементи для відображення помилок
    const fullName = document.getElementById("fullName"); // Поле "Повне ім'я"
    const email = document.getElementById("email"); // Поле "Електронна пошта"
    const phone = document.getElementById("phone"); // Поле "Номер телефону"
    const message = document.getElementById("message"); // Поле "Повідомлення"

    const nameError = document.getElementById("nameError"); // Елемент для помилки імені
    const emailError = document.getElementById("emailError"); // Елемент для помилки електронної пошти
    const phoneError = document.getElementById("phoneError"); // Елемент для помилки телефону
    const messageError = document.getElementById("messageError"); // Елемент для помилки повідомлення
    const successMessage = document.getElementById("successMessage"); // Елемент для повідомлення про успіх

    // Очищаємо повідомлення про помилки перед перевіркою
    nameError.textContent = ""; // Скидаємо текст помилки для імені
    emailError.textContent = ""; // Скидаємо текст помилки для електронної пошти
    phoneError.textContent = ""; // Скидаємо текст помилки для телефону
    messageError.textContent = ""; // Скидаємо текст помилки для повідомлення
    successMessage.classList.add("hidden"); // Приховуємо повідомлення про успіх

    let hasError = false; // Змінна для перевірки наявності помилок

    // Регулярний вираз для перевірки правильності імені (лише літери та пробіли)
    const namePattern = /^[a-zA-Zа-яА-ЯіїєґІЇЄҐ\s]+$/;
    if (fullName.value.trim() === "") { // Перевіряємо, чи поле порожнє
        nameError.textContent = "Це поле обов'язкове для заповнення."; // Повідомлення про обов'язковість
        nameError.style.display = "block"; // Відображаємо помилку
        hasError = true; // Встановлюємо наявність помилки
    } else if (!namePattern.test(fullName.value)) { // Перевіряємо правильність введення
        nameError.textContent = "Ім'я може містити лише літери та пробіли."; // Повідомлення про невірний формат
        nameError.style.display = "block"; // Відображаємо помилку
        hasError = true; // Встановлюємо наявність помилки
    } else {
        nameError.style.display = "none"; // Прибираємо помилку, якщо введення коректне
    }

    // Регулярний вираз для перевірки електронної пошти
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.value.trim() === "") { // Перевіряємо, чи поле порожнє
        emailError.textContent = "Це поле обов'язкове для заповнення."; // Повідомлення про обов'язковість
        emailError.style.display = "block"; // Відображаємо помилку
        hasError = true; // Встановлюємо наявність помилки
    } else if (!emailPattern.test(email.value)) { // Перевіряємо правильність введення
        emailError.textContent = "Будь ласка, введіть коректну електронну пошту (латиницею, з символом '@')."; // Повідомлення про невірний формат
        emailError.style.display = "block"; // Відображаємо помилку
        hasError = true; // Встановлюємо наявність помилки
    } else {
        emailError.style.display = "none"; // Прибираємо помилку, якщо введення коректне
    }

    // Регулярний вираз для перевірки номера телефону
    const phonePattern = /^\+380\d{9}$/;
    if (phone.value.trim() === "") { // Перевіряємо, чи поле порожнє
        phoneError.textContent = "Це поле обов'язкове для заповнення."; // Повідомлення про обов'язковість
        phoneError.style.display = "block"; // Відображаємо помилку
        hasError = true; // Встановлюємо наявність помилки
    } else if (!phonePattern.test(phone.value)) { // Перевіряємо правильність введення
        phoneError.textContent = "Будь ласка, введіть коректний номер телефону у форматі +380 ХХХ ХХХ ХХХХ."; // Повідомлення про невірний формат
        phoneError.style.display = "block"; // Відображаємо помилку
        hasError = true; // Встановлюємо наявність помилки
    } else {
        phoneError.style.display = "none"; // Прибираємо помилку, якщо введення коректне
    }

    // Перевірка поля "Повідомлення"
    if (message.value.trim() === "") { // Перевіряємо, чи поле порожнє
        messageError.textContent = "Це поле обов'язкове для заповнення."; // Повідомлення про обов'язковість
        messageError.style.display = "block"; // Відображаємо помилку
        hasError = true; // Встановлюємо наявність помилки
    } else {
        messageError.style.display = "none"; // Прибираємо помилку, якщо введення коректне
    }

    if (hasError) { // Якщо є помилки
        event.preventDefault(); // Зупиняємо стандартну відправку форми
    } else {
        // Якщо всі поля заповнені коректно
        successMessage.classList.remove("hidden"); // Показуємо повідомлення про успіх
        successMessage.textContent = "Ваше повідомлення надіслано успішно!"; // Текст повідомлення

        // Очищуємо поля форми
        fullName.value = ""; // Очищаємо поле "Повне ім'я"
        email.value = ""; // Очищаємо поле "Електронна пошта"
        phone.value = ""; // Очищаємо поле "Номер телефону"
        message.value = ""; // Очищаємо поле "Повідомлення"

        event.preventDefault(); // Зупиняємо подію, щоб форма не відправлялася
    }
});
