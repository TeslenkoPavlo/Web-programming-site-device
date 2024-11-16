// Функція закриває модальне вікно продукту
function closeProductModal() {
    // Встановлює display "none" для елемента з id "product-modal" (закриває модальне вікно)
    document.getElementById("product-modal").style.display = "none";
}

// Функція показує кнопку "Переглянути товар" при наведенні на картку
function showButton(card) {
    // Встановлює opacity кнопки "Переглянути товар" в 1 (робить її видимою)
    card.querySelector('.view-button').style.opacity = 1;
}

// Функція ховає кнопку "Переглянути товар" при виведенні курсора з картки
function hideButton(card) {
    // Встановлює opacity кнопки "Переглянути товар" в 0 (ховає її)
    card.querySelector('.view-button').style.opacity = 0;
}

// Функція сортує телефони за ціною або випадковим чином
function shufflePhones() {
    // Отримує список всіх телефонів в контейнері "phone-list"
    const phoneList = document.querySelector('.phone-list');
    // Перетворює всі елементи списку на масив
    const phones = Array.from(phoneList.children);
    // Отримує значення вибраної опції сортування
    const sortOption = document.getElementById('sort-options').value;

    // Перевіряє вибрану опцію сортування і сортує відповідно до неї
    if (sortOption === 'price-asc') {
        // Сортує телефони за ціною від меншої до більшої
        phones.sort((a, b) => parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price')));
    } else if (sortOption === 'price-desc') {
        // Сортує телефони за ціною від більшої до меншої
        phones.sort((a, b) => parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price')));
    } else {
        // Якщо вибрано іншу опцію, перемішує телефони випадковим чином
        phones.sort(() => Math.random() - 0.5);
    }

    // Додає телефони в контейнер в новому порядку
    phones.forEach(phone => phoneList.appendChild(phone));
}

// Функція фільтрує телефони по вибраних брендах
function filterPhones() {
    // Отримує всі чекбокси в групі фільтрів
    const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    // Створює масив вибраних брендів
    const selectedBrands = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked) // Фільтрує тільки вибрані чекбокси
        .map(checkbox => checkbox.value); // Мапує значення вибраних чекбоксів на масив брендів

    // Отримує всі картки телефонів
    const phoneCards = document.querySelectorAll('.phone-card');

    // Перевіряє кожну картку телефону
    phoneCards.forEach(card => {
        // Отримує перше слово з назви телефону (бренд)
        const brand = card.querySelector('.phone-title').textContent.split(' ')[0];
        // Якщо немає вибраних брендів або поточний бренд є серед вибраних, показує картку
        if (selectedBrands.length === 0 || selectedBrands.includes(brand)) {
            card.style.display = 'flex'; // Показує картку
        } else {
            card.style.display = 'none'; // Ховає картку
        }
    });
}

// Функція додає товар до кошика в локальне сховище
function addToCart(product) {
    // Записує продукт в локальне сховище під ключем 'addToCart'
    localStorage.setItem('addToCart', JSON.stringify(product));
}

// Функція показує деталі продукту в модальному вікні
function showProductDetails(button) {
    // Отримує батьківську картку телефону для кнопки "Переглянути товар"
    const card = button.closest('.phone-card');
    // Отримує шлях до зображення телефону з атрибуту "data-image"
    const imageSrc = card.getAttribute('data-image');
    // Отримує назву телефону з елемента ".phone-title"
    const title = card.querySelector('.phone-title').textContent;
    // Отримує ціну телефону з атрибуту "data-price"
    const price = card.getAttribute('data-price');  

    // Встановлює зображення в модальному вікні
    document.getElementById("modal-image").src = imageSrc;
    // Встановлює заголовок в модальному вікні
    document.getElementById("modal-title").textContent = title;
    // Встановлює ціну в модальному вікні
    document.getElementById("modal-price").textContent = "Ціна: $" + price;
    // Відображає модальне вікно
    document.getElementById("product-modal").style.display = "flex";

    // Записує дані продукту в кнопку "Купити"
    document.querySelector(".buy-button").dataset.price = price;
    document.querySelector(".buy-button").dataset.image = imageSrc;
}

// Функція додає товар до кошика після натискання кнопки "Купити"
function addToCart(button) {
    // Отримує назву товару з модального вікна
    const title = document.getElementById("modal-title").textContent;
    // Отримує ціну товару з кнопки "Купити"
    const price = button.dataset.price;
    // Отримує шлях до зображення товару з кнопки "Купити"
    const imageSrc = button.dataset.image;

    // Отримує існуючі елементи кошика з локального сховища або створює новий масив
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Шукає товар в кошику
    const existingItem = cartItems.find(item => item.title === title);

    // Якщо товар вже є в кошику, збільшує кількість
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Якщо товару немає в кошику, додає новий елемент
        cartItems.push({ title, price: parseFloat(price), imageSrc, quantity: 1 });
    }

    // Записує оновлений кошик в локальне сховище
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Виводить повідомлення про успішне додавання товару до кошика
    alert("Товар додано до кошика!");
}

// Додає обробник події для кнопки "Купити"
document.querySelector(".buy-button").addEventListener("click", function() {
    // Викликає функцію addToCart при натисканні кнопки
    addToCart(this);
});
