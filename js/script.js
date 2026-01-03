// Обработка формы заказа такси
const taxiForm = document.getElementById('taxi-form');

if (taxiForm) {
    taxiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получение значений формы
        const pickup = document.getElementById('pickup').value;
        const destination = document.getElementById('destination').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const carType = document.getElementById('car-type').value;
        const passengers = document.getElementById('passengers').value;
        const comments = document.getElementById('comments').value;
        
        // Проверка обязательных полей
        if (!pickup || !destination || !date || !time || !carType || !passengers) {
            alert('Пожалуйста, заполните все обязательные поля!');
            return;
        }
        
        // Проверка количества пассажиров для Лада Ларгус
        if (carType === 'lada-largus' && parseInt(passengers) > 7) {
            alert('Лада Ларгус рассчитан на 7 пассажиров. Пожалуйста, укажите корректное количество пассажиров.');
            return;
        }
        
        // Формирование сообщения
        let message = `Новый заказ такси!\n\n`;
        message += `Место подачи: ${pickup}\n`;
        message += `Пункт назначения: ${destination}\n`;
        message += `Дата: ${date}\n`;
        message += `Время: ${time}\n`;
        message += `Тип автомобиля: ${getCarTypeName(carType)}\n`;
        message += `Количество пассажиров: ${passengers}\n`;
        
        if (comments) {
            message += `Комментарии: ${comments}\n`;
        }
        
        // Создаем ссылку для звонка на основной номер
        const mainPhone = '89184179277';
        const mainCallLink = document.createElement('a');
        mainCallLink.href = `tel:${mainPhone}`;
        
        // Пытаемся совершить вызов (работает только при пользовательском действии)
        if (mainCallLink.click) {
            mainCallLink.click();
        }
        
        // Отправка SMS-сообщения на номер администратора
        sendSMSNotification(message);
        
        // Показываем успешное сообщение
        alert(`Спасибо за заказ! Скоро мы свяжемся с вами по телефону 8 (918) 417-92-77 для подтверждения поездки. Уведомление отправлено на номер 8 (918) 986-49-85.`);
        
        // Сброс формы
        taxiForm.reset();
    });
}

// Отправка SMS-сообщения на номер администратора
function sendSMSNotification(message) {
    // Номер администратора
    const adminPhone = '89189864985';
    
    // Формирование текста сообщения для SMS
    const smsText = encodeURIComponent(message);
    
    // Создание ссылки для отправки SMS
    const smsLink = document.createElement('a');
    smsLink.href = `sms:${adminPhone}?body=${smsText}`;
    
    // Попытка открытия SMS-приложения (работает на мобильных устройствах)
    try {
        smsLink.click();
    } catch (error) {
        console.log('Не удалось автоматически открыть SMS-приложение:', error);
    }
    
    // Альтернативный способ отправки SMS через всплывающее окно
    if (!window.matchMedia('(max-width: 768px)').matches) {
        // На десктопах показываем информацию о необходимости вручную отправить SMS
        setTimeout(() => {
            alert(`Пожалуйста, отправьте SMS с заказом на номер 8 (918) 986-49-85:\n\n${message}`);
        }, 1000);
    }
    
    // Логируем сообщение заказа
    console.log('SMS уведомление отправлено на номер 8 (918) 986-49-85. Детали заказа:', message);
}

// Функция для получения полного названия автомобиля
function getCarTypeName(carCode) {
    const cars = {
        'lada-largus': 'Лада Ларгус (7 мест)',
        'passenger-car': 'Легковой автомобиль (4-5 мест)'
    };
    
    return cars[carCode] || carCode;
}

// Плавная прокрутка к разделам
if (document.querySelectorAll('nav a')) {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Анимация появления элементов при прокрутке
const revealElements = document.querySelectorAll('.service-card, .about-image img, .prices-table table, .contact-item');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Установка начальных стилей для анимации
if (revealElements) {
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Обработчик прокрутки
window.addEventListener('scroll', revealOnScroll);

// Инициализация при загрузке страницы
window.addEventListener('load', revealOnScroll);
