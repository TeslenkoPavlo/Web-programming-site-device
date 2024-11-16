// Закриває модальне вікно, змінюючи стиль display на "none"
function closeProductModal() {
    // Отримуємо елемент модального вікна за його ID та ховаємо його
    document.getElementById("product-modal").style.display = "none";
}

// Показує кнопку "Переглянути" на картці, змінюючи її прозорість
function showButton(card) {
    // Знаходимо елемент кнопки всередині переданої картки та встановлюємо прозорість у 1
    card.querySelector('.view-button').style.opacity = 1;
}

// Приховує кнопку "Переглянути" на картці, змінюючи її прозорість
function hideButton(card) {
    // Знаходимо елемент кнопки всередині переданої картки та встановлюємо прозорість у 0
    card.querySelector('.view-button').style.opacity = 0;
}

// Сортує або перемішує список повербанків залежно від вибраної опції
function shufflePowerbanks() {
    // Отримуємо список усіх карток повербанків
    const powerbankList = document.querySelector('.powerbank-list');
    // Преобразуємо дочірні елементи списку в масив
    const powerbanks = Array.from(powerbankList.children);
    // Отримуємо вибраний параметр сортування
    const sortOption = document.getElementById('sort-options').value;

    // Перевіряємо, чи сортування за ціною
    if (sortOption === 'price-asc' || sortOption === 'price-desc') {
        // Сортуємо масив карток за ціною у зростаючому або спадному порядку
        powerbanks.sort((a, b) => {
            // Отримуємо значення ціни кожної картки
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));

            // Виконуємо сортування залежно від вибраної опції
            return sortOption === 'price-asc' ? priceA - priceB : priceB - priceA;
        });
    } else {
        // Виконуємо псевдорандомне перемішування карток
        let originalOrder = powerbanks.slice(); // Зберігаємо початковий порядок карток
        do {
            // Перемішуємо картки за допомогою Math.random
            powerbanks.sort(() => Math.random() - 0.5);
        } while (
            powerbanks.every(
                (powerbank, index) => powerbank === originalOrder[index]
            )
        ); // Перевіряємо, щоб порядок відрізнявся від початкового
    }

    // Додаємо відсортовані картки назад до контейнера
    powerbanks.forEach(powerbank => powerbankList.appendChild(powerbank));
}

// Фільтрує картки повербанків залежно від вибраних брендів
function filterPowerbanks() {
    // Отримуємо всі прапорці у фільтрі
    const checkboxes = document.querySelectorAll(
        '.filter-group input[type="checkbox"]'
    );
    // Отримуємо масив значень вибраних брендів
    const selectedBrands = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked) // Вибираємо лише активні прапорці
        .map(checkbox => checkbox.value); // Отримуємо значення з прапорців

    // Отримуємо всі картки повербанків
    const powerbankCards = document.querySelectorAll('.powerbank-card');

    // Проходимо по кожній картці
    powerbankCards.forEach(card => {
        // Визначаємо бренд картки на основі її заголовка
        const brand = card.querySelector('.powerbank-title').textContent.split(' ')[0];
        // Відображаємо або приховуємо картку залежно від вибраного бренду
        if (selectedBrands.length === 0 || selectedBrands.includes(brand)) {
            card.style.display = 'flex'; // Показуємо картку
        } else {
            card.style.display = 'none'; // Ховаємо картку
        }
    });
}

// Додає товар до локального сховища
function addToCart(product) {
    // Зберігаємо об'єкт товару у локальному сховищі під ключем "addToCart"
    localStorage.setItem('addToCart', JSON.stringify(product));
}

// Відображає деталі товару у модальному вікні
function showProductDetails(button) {
    // Знаходимо картку, до якої належить кнопка
    const card = button.closest('.powerbank-card');
    // Отримуємо зображення товару з атрибуту data-image
    const imageSrc = card.getAttribute('data-image');
    // Отримуємо заголовок товару
    const title = card.querySelector('.powerbank-title').textContent;
    // Отримуємо ціну товару з атрибуту data-price
    const price = card.getAttribute('data-price');

    // Встановлюємо дані в модальне вікно
    document.getElementById("modal-image").src = imageSrc;
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-price").textContent = "Ціна: $" + price;
    document.getElementById("product-modal").style.display = "flex"; // Показуємо модальне вікно

    // Зберігаємо дані товару в атрибути кнопки "Купити"
    document.querySelector(".buy-button").dataset.price = price;
    document.querySelector(".buy-button").dataset.image = imageSrc;
}

// Додає товар до кошика у локальному сховищі
function addToCart(button) {
    // Отримуємо заголовок товару
    const title = document.getElementById("modal-title").textContent;
    // Отримуємо ціну товару з атрибутів кнопки
    const price = button.dataset.price;
    // Отримуємо зображення товару з атрибутів кнопки
    const imageSrc = button.dataset.image;

    // Отримуємо існуючі товари з кошика або створюємо порожній масив
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Перевіряємо, чи товар вже є в кошику
    const existingItem = cartItems.find(item => item.title === title);

    if (existingItem) {
        // Якщо товар є, збільшуємо його кількість
        existingItem.quantity += 1;
    } else {
        // Якщо товару немає, додаємо його до масиву
        cartItems.push({ title, price: parseFloat(price), imageSrc, quantity: 1 });
    }

    // Зберігаємо оновлений масив у локальному сховищі
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Виводимо повідомлення про успішне додавання
    alert("Товар додано до кошика!");
}

// Додаємо обробник події кліку для кнопки
document.querySelector(".buy-button").addEventListener("click", function () {
    // Викликаємо функцію додавання до кошика, передаючи поточну кнопку
    addToCart(this);
});
