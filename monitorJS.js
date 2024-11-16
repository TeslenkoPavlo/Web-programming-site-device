// Функція для закриття модального вікна товару
function closeProductModal() {
    // Встановлює стиль display в none для приховування модального вікна
    document.getElementById("product-modal").style.display = "none";
}

// Функція для показу кнопки перегляду на картці товару
function showButton(card) {
    // Встановлює видимість кнопки перегляду шляхом зміни opacity на 1
    card.querySelector('.view-button').style.opacity = 1;
}

// Функція для приховування кнопки перегляду на картці товару
function hideButton(card) {
    // Змінює видимість кнопки перегляду, встановлюючи opacity на 0
    card.querySelector('.view-button').style.opacity = 0;
}

// Функція для перемішування або сортування списку моніторів
function shuffleMonitors() {
    // Отримує список моніторів
    const monitorList = document.querySelector('.monitor-list');
    // Створює масив елементів із дочірніх вузлів списку
    const monitors = Array.from(monitorList.children);
    // Отримує вибраний параметр сортування
    const sortOption = document.getElementById('sort-options').value;

    // Перевіряє, чи вибрано сортування за ціною
    if (sortOption === 'price-asc' || sortOption === 'price-desc') {
        // Сортує монітори за ціною
        monitors.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));

            // Залежно від вибору виконує сортування за зростанням чи спаданням
            return sortOption === 'price-asc' ? priceA - priceB : priceB - priceA;
        });
    } else {
        // Виконує псевдорандомне перемішування для інших опцій сортування
        let originalOrder = monitors.slice();
        do {
            monitors.sort(() => Math.random() - 0.5);
        } while (monitors.every((monitor, index) => monitor === originalOrder[index]));
    }

    // Додає відсортовані або перемішані елементи назад до списку
    monitors.forEach(monitor => monitorList.appendChild(monitor));
}

// Функція для фільтрації моніторів за обраними брендами
function filterMonitors() {
    // Отримує всі чекбокси для фільтрації
    const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    // Отримує значення вибраних чекбоксів
    const selectedBrands = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Отримує всі картки моніторів
    const monitorCards = document.querySelectorAll('.monitor-card');

    // Перевіряє, чи відповідає картка вибраним брендам, і приховує/показує її
    monitorCards.forEach(card => {
        const brand = card.querySelector('.monitor-title').textContent.split(' ')[0];
        if (selectedBrands.length === 0 || selectedBrands.includes(brand)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Функція для додавання товару до кошика
function addToCart(product) {
    // Отримує поточні елементи кошика з localStorage або створює новий масив
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Перевіряє, чи товар уже є в кошику
    const existingItem = cartItems.find(item => item.title === product.title);

    if (existingItem) {
        // Якщо товар є, збільшує його кількість
        existingItem.quantity += 1;
    } else {
        // Якщо товар відсутній, додає його до масиву
        cartItems.push({ ...product, quantity: 1 });
    }

    // Оновлює кошик у localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Відображає повідомлення про успішне додавання
    alert("Товар додано до кошика!");
}

// Функція для відображення деталей товару в модальному вікні
function showProductDetails(button) {
    // Отримує батьківську картку товару для обраної кнопки
    const card = button.closest('.monitor-card');
    // Отримує джерело зображення, назву та ціну товару
    const imageSrc = card.getAttribute('data-image');
    const title = card.querySelector('.monitor-title').textContent;
    const price = card.getAttribute('data-price');

    // Оновлює модальне вікно отриманими даними
    document.getElementById("modal-image").src = imageSrc;
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-price").textContent = "Ціна: $" + price;
    document.getElementById("product-modal").style.display = "flex";

    // Створює об'єкт товару для додавання до кошика
    const product = { title, price: parseFloat(price), imageSrc };

    // Очищає попередні обробники кнопки покупки
    const buyButton = document.querySelector(".buy-button");
    buyButton.replaceWith(buyButton.cloneNode(true)); // Клонує кнопку для очищення обробників
    document.querySelector(".buy-button").addEventListener("click", function() {
        // Додає товар до кошика при натисканні кнопки
        addToCart(product);
    });
}
