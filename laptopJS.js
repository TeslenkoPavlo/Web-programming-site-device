// Функція для закриття модального вікна продукту
function closeProductModal() {
    // Ховає модальне вікно, змінюючи стиль display на "none"
    document.getElementById("product-modal").style.display = "none";
}

// Функція для показу кнопки перегляду
function showButton(card) {
    // Встановлює прозорість кнопки на 1 (зробити її видимою)
    card.querySelector('.view-button').style.opacity = 1;
}

// Функція для приховування кнопки перегляду
function hideButton(card) {
    // Встановлює прозорість кнопки на 0 (зробити її невидимою)
    card.querySelector('.view-button').style.opacity = 0;
}

// Функція для сортування та псевдорандомного перемішування ноутбуків
function shuffleLaptops() {
    // Отримує список контейнера з ноутбуками
    const laptopList = document.querySelector('.laptop-list');
    // Перетворює дочірні елементи на масив
    const laptops = Array.from(laptopList.children);
    // Отримує значення обраного варіанту сортування
    const sortOption = document.getElementById('sort-options').value;

    if (sortOption === 'price-asc' || sortOption === 'price-desc') {
        // Сортує за ціною у порядку зростання чи спадання
        laptops.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));

            return sortOption === 'price-asc' ? priceA - priceB : priceB - priceA;
        });
    } else {
        // Перемішує масив випадковим чином
        laptops.sort(() => Math.random() - 0.5);
    }

    // Вставляє відсортовані елементи назад у контейнер
    laptops.forEach(laptop => laptopList.appendChild(laptop));
}

// Функція для фільтрації ноутбуків за брендом
function filterLaptops() {
    // Отримує всі чекбокси у фільтрі
    const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    // Формує масив обраних брендів
    const selectedBrands = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Отримує всі картки ноутбуків
    const laptopCards = document.querySelectorAll('.laptop-card');

    laptopCards.forEach(card => {
        // Отримує бренд із заголовку ноутбука
        const brand = card.querySelector('.laptop-title').textContent.split(' ')[0];
        // Показує або ховає ноутбук залежно від вибраного бренду
        if (selectedBrands.length === 0 || selectedBrands.includes(brand)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Функція для додавання продукту в кошик (локальне зберігання)
function addToCart(product) {
    // Зберігає обраний продукт у локальне сховище
    localStorage.setItem('addToCart', JSON.stringify(product));
}

// Функція для показу деталей продукту у модальному вікні
function showProductDetails(button) {
    // Знаходить відповідну картку продукту
    const card = button.closest('.laptop-card');
    // Отримує дані продукту з атрибутів картки
    const imageSrc = card.getAttribute('data-image');
    const title = card.querySelector('.laptop-title').textContent;
    const price = card.getAttribute('data-price'); // Отримує ціну з атрибута

    // Встановлює дані у відповідні елементи модального вікна
    document.getElementById("modal-image").src = imageSrc;
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-price").textContent = "Ціна: $" + price;
    document.getElementById("product-modal").style.display = "flex";

    // Зберігає дані продукту у кнопці покупки
    document.querySelector(".buy-button").dataset.price = price;
    document.querySelector(".buy-button").dataset.image = imageSrc;
}

// Функція для додавання продукту у кошик із модального вікна
function addToCart(button) {
    // Отримує дані продукту з модального вікна
    const title = document.getElementById("modal-title").textContent;
    const price = button.dataset.price;
    const imageSrc = button.dataset.image;

    // Отримує поточні елементи кошика з локального сховища
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Перевіряє, чи вже є цей продукт у кошику
    const existingItem = cartItems.find(item => item.title === title);

    if (existingItem) {
        // Якщо продукт існує, збільшує кількість
        existingItem.quantity += 1;
    } else {
        // Якщо продукт новий, додає його до списку
        cartItems.push({ title, price: parseFloat(price), imageSrc, quantity: 1 });
    }

    // Оновлює дані у локальному сховищі
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Відображає повідомлення про успішне додавання
    alert("Товар додано до кошика!");
}

// Додає обробник подій для кнопки
document.querySelector(".buy-button").addEventListener("click", function() {
    // Викликає функцію для додавання у кошик
    addToCart(this);
});
