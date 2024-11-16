// Функція для закриття модального вікна товару
function closeProductModal() {
    // Змінює стиль відображення модального вікна на "none", щоб приховати його
    document.getElementById("product-modal").style.display = "none";
}

// Функція для відображення кнопки "Переглянути товар"
function showButton(card) {
    // Змінює прозорість кнопки, роблячи її видимою
    card.querySelector('.view-button').style.opacity = 1;
}

// Функція для приховування кнопки "Переглянути товар"
function hideButton(card) {
    // Змінює прозорість кнопки, роблячи її невидимою
    card.querySelector('.view-button').style.opacity = 0;
}

// Функція для сортування та перемішування списку навушників
function shuffleHeadphones() {
    // Отримує список навушників з контейнера
    const headphoneList = document.querySelector('.headphone-list');
    // Створює масив із дочірніх елементів списку
    const headphones = Array.from(headphoneList.children);
    // Отримує вибране значення сортування
    const sortOption = document.getElementById('sort-options').value;

    // Сортування за ціною у зростаючому або спадаючому порядку
    if (sortOption === 'price-asc' || sortOption === 'price-desc') {
        headphones.sort((a, b) => {
            // Отримує ціну кожного елементу
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            
            // Сортує за зростанням або спаданням
            return sortOption === 'price-asc' ? priceA - priceB : priceB - priceA;
        });
    } else {
        // Псевдовипадкове перемішування для інших опцій сортування
        let originalOrder = headphones.slice();
        do {
            headphones.sort(() => Math.random() - 0.5);
        } while (headphones.every((headphone, index) => headphone === originalOrder[index]));
    }

    // Додає елементи в контейнер у новому порядку
    headphones.forEach(headphone => headphoneList.appendChild(headphone));
}

// Функція для фільтрації навушників за брендами
function filterHeadphones() {
    // Отримує всі прапорці фільтрів
    const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    // Отримує значення вибраних брендів
    const selectedBrands = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Отримує всі картки навушників
    const headphoneCards = document.querySelectorAll('.headphone-card');

    // Перевіряє та приховує/відображає картки відповідно до фільтру
    headphoneCards.forEach(card => {
        // Отримує бренд із заголовка картки
        const brand = card.querySelector('.headphone-title').textContent.split(' ')[0];
        // Відображає картку, якщо бренд вибрано або жоден фільтр не активний
        if (selectedBrands.length === 0 || selectedBrands.includes(brand)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Функція для додавання товару до кошика (збереження в локальному сховищі)
function addToCart(product) {
    // Зберігає товар у локальному сховищі
    localStorage.setItem('addToCart', JSON.stringify(product));
}

// Функція для відображення деталей товару в модальному вікні
function showProductDetails(button) {
    // Знаходить картку, з якої натиснута кнопка
    const card = button.closest('.headphone-card');
    // Отримує дані з картки (зображення, заголовок, ціну)
    const imageSrc = card.getAttribute('data-image');
    const title = card.querySelector('.headphone-title').textContent;
    const price = card.getAttribute('data-price'); // Отримуємо ціну з data-price

    // Заповнює модальне вікно відповідними даними
    document.getElementById("modal-image").src = imageSrc;
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-price").textContent = "Ціна: $" + price;
    document.getElementById("product-modal").style.display = "flex";

    // Зберігає дані для кнопки "Додати до кошика"
    document.querySelector(".buy-button").dataset.price = price;
    document.querySelector(".buy-button").dataset.image = imageSrc;
}

// Функція для додавання товару до кошика з модального вікна
function addToCart(button) {
    // Отримує дані з модального вікна (заголовок, ціна, зображення)
    const title = document.getElementById("modal-title").textContent;
    const price = button.dataset.price;
    const imageSrc = button.dataset.image;

    // Отримує існуючі товари з кошика або створює новий масив
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Перевіряє, чи товар вже є в кошику
    const existingItem = cartItems.find(item => item.title === title);

    if (existingItem) {
        // Збільшує кількість існуючого товару
        existingItem.quantity += 1;
    } else {
        // Додає новий товар до кошика
        cartItems.push({ title, price: parseFloat(price), imageSrc, quantity: 1 });
    }

    // Зберігає оновлений список товарів у локальному сховищі
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Відображає повідомлення про успішне додавання
    alert("Товар додано до кошика!");
}

// Додає обробник події для кнопки "Додати до кошика"
document.querySelector(".buy-button").addEventListener("click", function() {
    // Викликає функцію для додавання товару
    addToCart(this);
});
