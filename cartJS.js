/* Функція для завантаження елементів кошика */
function loadCartItems() {
    /* Отримання контейнера для елементів кошика */
    const cartItemsContainer = document.getElementById("cart-items");

    /* Завантаження елементів кошика з локального сховища або створення порожнього масиву */
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    /* Ініціалізація загальної суми */
    let total = 0;

    /* Очищення контейнера перед додаванням нових елементів */
    cartItemsContainer.innerHTML = "";

    /* Перебір кожного елемента кошика */
    cartItems.forEach(item => {
        /* Обчислення загальної вартості для одного елемента */
        const itemTotalPrice = item.price * item.quantity;

        /* Додавання вартості елемента до загальної суми */
        total += itemTotalPrice;

        /* Створення контейнера для одного елемента кошика */
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item"; /* Додавання класу для стилізації */

        /* Додавання HTML-коду для відображення даних про елемент */
        cartItem.innerHTML = `
            <img src="${item.imageSrc}" alt="${item.title}"> <!-- Зображення товару -->
            <div class="item-details">
                <h3>${item.title}</h3> <!-- Назва товару -->
                <p>Ціна: $${item.price}</p> <!-- Ціна за одиницю -->
                <div class="item-quantity">
                    <button onclick="changeQuantity('${item.title}', -1)">-</button> <!-- Зменшення кількості -->
                    <input type="text" value="${item.quantity}" readonly> <!-- Поле кількості -->
                    <button onclick="changeQuantity('${item.title}', 1)">+</button> <!-- Збільшення кількості -->
                    <button class="delete-button" onclick="removeItem('${item.title}')">
                        <i class="fas fa-trash-alt"></i> Видалити <!-- Кнопка видалення -->
                    </button>
                </div>
            </div>
            <p>Сума: $${itemTotalPrice}</p> <!-- Загальна вартість для цього товару -->
        `;

        /* Додавання елемента до контейнера кошика */
        cartItemsContainer.appendChild(cartItem);
    });

    /* Оновлення тексту загальної суми на сторінці */
    document.getElementById("total-price").textContent = `Загальна сума: $${total.toFixed(2)}`;
}

/* Функція для видалення елемента з кошика */
function removeItem(title) {
    /* Завантаження елементів кошика з локального сховища */
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));

    /* Фільтрація елементів, щоб виключити той, що потрібно видалити */
    cartItems = cartItems.filter(item => item.title !== title);

    /* Оновлення локального сховища новими даними */
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    /* Перезавантаження елементів кошика */
    loadCartItems();
}

/* Функція для зміни кількості товару */
function changeQuantity(title, amount) {
    /* Завантаження елементів кошика з локального сховища */
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));

    /* Пошук товару за назвою */
    const item = cartItems.find(item => item.title === title);

    if (item) { /* Якщо товар знайдено */
        item.quantity += amount; /* Зміна кількості товару */

        /* Перевірка на мінімальну кількість */
        if (item.quantity < 1) {
            alert("Кількість товару повинна бути більше одного для покупки.");
            item.quantity = 1;
        } 
        /* Перевірка на максимальну кількість */
        else if (item.quantity > 10) {
            alert("Неможливо замовити більше 10 товарів за раз.");
            item.quantity = 10;
        }

        /* Оновлення локального сховища */
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        /* Перезавантаження елементів кошика */
        loadCartItems();
    }
}

/* Функція для оформлення замовлення */
function checkout() {
    /* Завантаження елементів кошика з локального сховища */
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    /* Якщо кошик порожній, відображення повідомлення */
    if (cartItems.length === 0) {
        alert("Ваш кошик порожній. Додайте товари до кошика перед оформленням замовлення.");
        return;
    }

    /* Запит ПІБ користувача */
    const name = prompt("Введіть ПІБ (до 30 символів):");
    if (name === null) return; /* Перевірка на скасування введення */
    if (!validateName(name)) return; /* Перевірка валідності імені */

    /* Запит віку користувача */
    const age = prompt("Введіть ваш вік:");
    if (age === null) return; /* Перевірка на скасування введення */
    if (!validateAge(age)) return; /* Перевірка валідності віку */

    /* Запит номера картки */
    const cardNumber = prompt("Введіть номер картки (16 цифр):");
    if (cardNumber === null) return; /* Перевірка на скасування введення */
    if (!validateCardNumber(cardNumber)) return; /* Перевірка валідності номера картки */

    /* Підтвердження замовлення */
    alert(`Ваш заказ оформлено! \n
    ПІБ: ${name} \n
    Вік: ${age} \n
    Номер картки: ${cardNumber}`);
}

/* Функція для перевірки валідності ПІБ */
function validateName(name) {
    if (!name) { /* Якщо поле порожнє */
        alert("Поле ПІБ не може бути порожнім.");
        return false;
    }
    if (name.length > 30) { /* Якщо ПІБ перевищує 30 символів */
        alert("ПІБ не повинен перевищувати 30 символів.");
        return false;
    }
    if (/[^а-яА-ЯёЁa-zA-Z\s]/.test(name)) { /* Якщо ПІБ містить недозволені символи */
        alert("ПІБ має містити лише літери.");
        return false;
    }
    return true; /* Валідне ПІБ */
}

/* Функція для перевірки валідності віку */
function validateAge(age) {
    if (!age) { /* Якщо поле порожнє */
        alert("Поле вік не може бути порожнім.");
        return false;
    }
    if (isNaN(age) || age < 18 || age > 100) { /* Якщо вік не є числом або виходить за допустимі межі */
        alert("Вік має бути числом від 18 до 100.");
        return false;
    }
    return true; /* Валідний вік */
}

/* Функція для перевірки валідності номера картки */
function validateCardNumber(cardNumber) {
    if (!cardNumber) { /* Якщо поле порожнє */
        alert("Поле номер картки не може бути порожнім.");
        return false;
    }
    if (cardNumber.length !== 16 || /[^\d]/.test(cardNumber)) { /* Якщо номер картки не складається з 16 цифр */
        alert("Номер картки має містити лише 16 цифр.");
        return false;
    }
    return true; /* Валідний номер картки */
}

/* Завантаження елементів кошика після завантаження сторінки */
document.addEventListener("DOMContentLoaded", loadCartItems);
