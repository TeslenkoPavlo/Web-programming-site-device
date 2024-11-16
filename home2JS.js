// Ініціалізація слайдера Swiper (самий перший рекламний слайдер)
var swiper = new Swiper('.swiper-container', {  
    // Налаштування автопрокрутки слайдів
    autoplay: {  
        // Затримка між слайдами (3 секунди)
        delay: 3000,  
        // Автопрокрутка не вимикається при взаємодії з слайдером
        disableOnInteraction: false,  
    },
    
    // Налаштування пагінації слайдера
    pagination: {  
        // Вказуємо елемент пагінації
        el: '.swiper-pagination',  
        // Тип пагінації: відображення у вигляді дробу (наприклад, 1/5)
        type: 'fraction',  
        // Дозволяємо клікабельність пагінації
        clickable: true,  
    },

    // Налаштування кнопок навігації для слайдера
    navigation: {  
        // Кнопка для переходу до наступного слайда
        nextEl: '.swiper-button-next',  
        // Кнопка для переходу до попереднього слайда
        prevEl: '.swiper-button-prev',  
    },
    
    // Заборона на переміщення слайдів за допомогою жестів
    allowTouchMove: false,  

    // Події слайдера
    on: {  
        // Функція, яка викликається після ініціалізації слайдера
        init: function() {  
            // Знаходимо кнопку для переходу до попереднього слайда
            var prevButton = document.querySelector('.swiper-button-prev');  
            // Знаходимо кнопку для переходу до наступного слайда
            var nextButton = document.querySelector('.swiper-button-next');  
            
            // Встановлюємо відступ зліва для кнопки попереднього слайда
            prevButton.style.left = '10px';  
            // Встановлюємо відступ справа для кнопки наступного слайда
            nextButton.style.right = '10px';  
            
            // Встановлюємо вертикальне вирівнювання для кнопки попереднього слайда
            prevButton.style.top = '50%';  
            // Центруємо кнопку по вертикалі
            prevButton.style.transform = 'translateY(-50%)';  
            
            // Встановлюємо вертикальне вирівнювання для кнопки наступного слайда
            nextButton.style.top = '50%';  
            // Центруємо кнопку по вертикалі
            nextButton.style.transform = 'translateY(-50%)';  
            
            // Встановлюємо відступ знизу для пагінації
            document.querySelector('.swiper-pagination').style.bottom = '10px';  
        },
    },
});





// Переходу на сторінки товарів на контейнерах секції категорії товарів
// Додаємо посилання для кожного елемента категорії в контейнері категорій
// Перенаправлення на сторінку телефону при натисканні на перший елемент
document.querySelector('.category-container .category-item:nth-child(1)').addEventListener('click', function() {  
    window.location.href = 'phoneHTML.html';  // Перехід на сторінку телефонів
});

// Перенаправлення на сторінку планшетів при натисканні на другий елемент
document.querySelector('.category-container .category-item:nth-child(2)').addEventListener('click', function() {  
    window.location.href = 'tabletHTML.html';  // Перехід на сторінку планшетів
});

// Перенаправлення на сторінку ноутбуків при натисканні на третій елемент
document.querySelector('.category-container .category-item:nth-child(3)').addEventListener('click', function() {  
    window.location.href = 'laptopHTML.html';  // Перехід на сторінку ноутбуків
});

// Перенаправлення на сторінку моніторів при натисканні на четвертий елемент
document.querySelector('.category-container .category-item:nth-child(4)').addEventListener('click', function() {  
    window.location.href = 'monitorHTML.html';  // Перехід на сторінку моніторів
});

// Перенаправлення на сторінку навушників при натисканні на п'ятий елемент
document.querySelector('.category-container .category-item:nth-child(5)').addEventListener('click', function() {  
    window.location.href = 'headphoneHTML.html';  // Перехід на сторінку навушників
});

// Перенаправлення на сторінку павербанків при натисканні на шостий елемент
document.querySelector('.category-container .category-item:nth-child(6)').addEventListener('click', function() {  
    window.location.href = 'powerbankHTML.html';  // Перехід на сторінку павербанків
});





// Функція для пошуку збігу тексту, введенний в пошуковий рядок
// Додаємо подію на форму пошуку
// Зупиняємо стандартну поведінку форми при її відправці
document.querySelector('.search-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Зупиняємо стандартну дію форми (не відправляти форму)
    
    // Отримуємо текст, введений у полі для пошуку, і обрізаємо зайві пробіли з обох сторін
    const searchText = document.querySelector('.search-input').value.trim();  
    
    // Якщо текст для пошуку не порожній, викликаємо функцію для виділення знайденого тексту
    if (searchText) {
        highlightTextSelection(searchText);  // Викликаємо функцію для виділення знайденого тексту
    }
});





// Функція для виділення знайденого тексту на сторінці
function highlightTextSelection(text) {
    // Очищаємо попередні виділення тексту
    window.getSelection().removeAllRanges();

    // Створюємо "перехідник" по всіх текстових вузлах сторінки
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    
    // Перетворюємо шуканий текст на нижній регістр для порівняння
    const lowerText = text.toLowerCase();

    // Пройдемо всі текстові вузли в документі
    while ((node = walker.nextNode())) {
        const nodeText = node.nodeValue.toLowerCase();  // Отримуємо текст поточного вузла
        const index = nodeText.indexOf(lowerText);  // Шукаємо позицію тексту в вузлі

        // Якщо знайдено збіг, виділяємо цей текст
        if (index !== -1) {
            const range = document.createRange();  // Створюємо діапазон для виділення
            range.setStart(node, index);  // Початок виділення
            range.setEnd(node, index + text.length);  // Кінець виділення

            const selection = window.getSelection();
            selection.removeAllRanges();  // Очищаємо попереднє виділення
            selection.addRange(range);  // Додаємо новий діапазон для виділення

            // Прокручуємо сторінку до знайденого збігу
            range.startContainer.parentNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;  // Завершуємо після першого знайденого збігу
        }
    }
    
    // Якщо збігів не знайдено, сповіщаємо користувача
    alert('Збігів не знайдено');
}




























// Налаштування автоматичного натискання на стрілки кожні 3 секунди
let moveForward = true; // Початковий напрямок перемикання
let autoSlideInterval; // Перемінна для зберігання інтервалу автоматичного переміщення
let isMouseOver = false; // Чи наведено курсор на слайдер
let isArrowClicked = false; // Чи натиснуто на стрілку

// Функція для запуску автоматичного переміщення
function startAutoSlide() {
    clearInterval(autoSlideInterval); // Очищуємо попередній інтервал

    // Запускаємо автоматичне перемикання, якщо курсор не наведено і не натиснуто стрілки
    if (!isMouseOver && !isArrowClicked) {
        autoSlideInterval = setInterval(() => {
            const nextButton = document.querySelector('#custom-slider .swiper-button-next');
            const prevButton = document.querySelector('#custom-slider .swiper-button-prev');

            if (moveForward) {
                nextButton.click(); // Натискаємо на праву стрілку
                if (nextButton.classList.contains('swiper-button-disabled')) {
                    moveForward = false; // Зміна напрямку на назад
                }
            } else {
                prevButton.click(); // Натискаємо на ліву стрілку
                if (prevButton.classList.contains('swiper-button-disabled')) {
                    moveForward = true; // Зміна напрямку на вперед
                }
            }
        }, 2000); // Перемикання кожні 2 секунди
    }
}

// Функція для зупинки автоматичного переміщення
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Відслідковуємо наведення курсора на слайдер
document.querySelector('#custom-slider').addEventListener('mouseenter', () => {
    isMouseOver = true;
    stopAutoSlide(); // Зупиняємо автоматичне переміщення
});

document.querySelector('#custom-slider').addEventListener('mouseleave', () => {
    isMouseOver = false;
    setTimeout(startAutoSlide, 2000); // Поновлюємо автоматичне переміщення через 3 секунди
});

// Відслідковуємо натискання на стрілки
document.querySelector('#custom-slider .swiper-button-next').addEventListener('click', () => {
    isArrowClicked = true;
    stopAutoSlide(); // Зупиняємо автоматичне переміщення
    setTimeout(() => {
        isArrowClicked = false;
        startAutoSlide();
    }, 2000); // Поновлюємо автоматичне переміщення через 3 секунди
});

document.querySelector('#custom-slider .swiper-button-prev').addEventListener('click', () => {
    isArrowClicked = true;
    stopAutoSlide(); // Зупиняємо автоматичне переміщення
    setTimeout(() => {
        isArrowClicked = false;
        startAutoSlide();
    }, 2000); // Поновлюємо автоматичне переміщення через 3 секунди
});

// Запускаємо автоматичне переміщення при завантаженні
startAutoSlide();
















