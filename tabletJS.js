// Функція для закриття модального вікна
function closeProductModal() {
    // Закриваємо модальне вікно, приховуючи його
    document.getElementById("product-modal").style.display = "none";
}

// Функція для показу кнопки "Переглянути товар" при наведенні на картку
function showButton(card) {
    // Робимо кнопку видимою, встановлюючи opacity в 1
    card.querySelector('.view-button').style.opacity = 1;
}

// Функція для приховування кнопки "Переглянути товар" при відведенні миші з картки
function hideButton(card) {
    // Змінюємо прозорість кнопки на 0, роблячи її невидимою
    card.querySelector('.view-button').style.opacity = 0;
}

// Функція для сортування або випадкового перемішування карток планшетів
function shuffleTablets() {
    // Отримуємо список планшетів
    const tabletList = document.querySelector('.tablet-list');
    // Перетворюємо список елементів на масив
    const tablets = Array.from(tabletList.children);
    // Отримуємо вибрану опцію сортування
    const sortOption = document.getElementById("sort-options").value;

    // Якщо вибрано сортування по зростанню ціни
    if (sortOption === "price-asc") {
        // Сортуємо планшети по зростанню ціни
        tablets.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
    } 
    // Якщо вибрано сортування по спаданню ціни
    else if (sortOption === "price-desc") {
        // Сортуємо планшети по спадному порядку ціни
        tablets.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
    } 
    else {
        // Якщо вибрано випадкове сортування
        tablets.sort(() => Math.random() - 0.5); // Перемішуємо елементи випадковим чином
    }

    // Перераховуємо планшети і додаємо їх назад в список
    tablets.forEach(tablet => tabletList.appendChild(tablet));
}

// Функція для фільтрації планшетів за обраними брендами
function filterTablets() {
    // Отримуємо всі прапорці вибору брендів
    const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    // Створюємо масив обраних брендів
    const selectedBrands = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked) // Фільтруємо тільки вибрані
        .map(checkbox => checkbox.value); // Отримуємо значення вибраних брендів

    // Отримуємо всі картки планшетів
    const tabletCards = document.querySelectorAll('.tablet-card');

    // Перебираємо картки планшетів
    tabletCards.forEach(card => {
        // Отримуємо бренд планшета з назви
        const brand = card.querySelector('.tablet-title').textContent.split(' ')[0];
        // Якщо бренди не вибрані або вибраний поточний бренд
        if (selectedBrands.length === 0 || selectedBrands.includes(brand)) {
            card.style.display = 'flex'; // Показуємо картку
        } else {
            card.style.display = 'none'; // Приховуємо картку
        }
    });
}

// Функція для додавання товару в кошик (локальне збереження)
function addToCart(product) {
    // Зберігаємо інформацію про товар в локальне сховище
    localStorage.setItem('addToCart', JSON.stringify(product));
}

// Функція для відображення деталей товару в модальному вікні
function showProductDetails(button) {
    // Отримуємо картку товару, до якої належить кнопка
    const card = button.closest('.tablet-card');
    // Отримуємо URL зображення товару
    const imageSrc = card.getAttribute('data-image');
    // Отримуємо назву товару
    const title = card.querySelector('.tablet-title').textContent;
    // Отримуємо ціну товару
    const price = card.getAttribute('data-price');

    // Якщо зображення є, встановлюємо його в модальне вікно
    if (imageSrc) {
        document.getElementById("modal-image").src = imageSrc;
    } else {
        console.error("Image source not found for this product."); // Якщо зображення немає, виводимо помилку в консоль
    }
    // Встановлюємо назву товару в модальному вікні
    document.getElementById("modal-title").textContent = title;
    // Встановлюємо ціну товару в модальному вікні
    document.getElementById("modal-price").textContent = "Ціна: $" + price;
    // Відображаємо модальне вікно
    document.getElementById("product-modal").style.display = "flex";

    // Встановлюємо дані для кнопки "Купити"
    document.querySelector(".buy-button").dataset.price = price;
    document.querySelector(".buy-button").dataset.image = imageSrc;
}

// Функція для додавання товару до кошика з модального вікна
function addToCart(button) {
    // Отримуємо назву, ціну та зображення товару з кнопки
    const title = document.getElementById("modal-title").textContent;
    const price = button.dataset.price;
    const imageSrc = button.dataset.image;

    // Отримуємо існуючі товари в кошику
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Перевіряємо, чи вже є такий товар в кошику
    const existingItem = cartItems.find(item => item.title === title);

    // Якщо товар вже є, збільшуємо кількість
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Якщо товару немає, додаємо новий
        cartItems.push({ title, price: parseFloat(price), imageSrc, quantity: 1 });
    }

    // Зберігаємо оновлений кошик в локальне сховище
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert("Товар додано до кошика!"); // Показуємо повідомлення про додавання до кошика
}

// Додаємо обробник події на кнопку
document.querySelector(".buy-button").addEventListener("click", function() {
    // Додаємо товар до кошика при натисканні на кнопку
    addToCart(this);
});
