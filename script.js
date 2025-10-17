document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const clearButton = document.getElementById('clearButton');
    const linkContainer = document.getElementById('linkContainer');
    const whatsappLink = document.getElementById('whatsappLink');
    const linkUrl = whatsappLink.querySelector('.link-url');
    const helpButton = document.getElementById('helpButton');
    const questionsSection = document.querySelector('.questions');
    const closeButton = document.querySelector('.close-button');

    // Функция для извлечения номера телефона из текста
    const cleanPhoneNumber = (text) => {
        // Регулярное выражение для поиска номера телефона
        // Ищем последовательности цифр, разделенные пробелами, скобками, дефисами, плюсами
        const phonePattern = /[\+]?[\d\s\(\)\-]{7,}/g;
        const matches = text.match(phonePattern);

        if (!matches) return '';

        // Берем самое длинное совпадение (скорее всего номер телефона)
        let longestMatch = matches.reduce((a, b) =>
            a.replace(/[^\d]/g, '').length > b.replace(/[^\d]/g, '').length ? a : b
        );

        // Очищаем от всех символов кроме цифр
        const cleanPhone = longestMatch.replace(/[^\d]/g, '');

        // Проверяем, что это похоже на номер телефона (минимум 7 цифр)
        return cleanPhone.length >= 7 ? cleanPhone : '';
    };

    // Функция для обновления ссылки
    const updateWhatsAppLink = (phone) => {
        const cleanPhone = cleanPhoneNumber(phone);
        if (cleanPhone) {
            const url = `https://wa.me/${cleanPhone}`;
            whatsappLink.href = url;
            linkUrl.textContent = url;
            linkContainer.classList.remove('hidden');
            localStorage.setItem('last_phone_number', phone);
        } else {
            linkContainer.classList.add('hidden');
            localStorage.removeItem('last_phone_number');
        }
    };

    // Восстанавливаем последний введенный номер при загрузке
    const savedPhone = localStorage.getItem('last_phone_number');
    if (savedPhone) {
        textInput.value = savedPhone;
        updateWhatsAppLink(savedPhone);
        clearButton.classList.remove('hidden');
    }

    // Обработчик ввода
    textInput.addEventListener('input', (e) => {
        const value = e.target.value;

        if (value) {
            clearButton.classList.remove('hidden');
        } else {
            clearButton.classList.add('hidden');
        }

        updateWhatsAppLink(value);
    });

    // Обработчик вставки
    textInput.addEventListener('paste', (e) => {
        setTimeout(() => {
            const value = textInput.value;
            if (value) {
                clearButton.classList.remove('hidden');
            }
            updateWhatsAppLink(value);
        }, 0);
    });

    // Обработчик клика по кнопке очистки
    clearButton.addEventListener('click', () => {
        textInput.value = '';
        clearButton.classList.add('hidden');
        linkContainer.classList.add('hidden');
        localStorage.removeItem('last_phone_number');
        textInput.focus();
    });

    // Обработчик клика по кнопке помощи
    if (helpButton) {
        helpButton.addEventListener('click', () => {
            questionsSection.classList.remove('hidden');
        });
    }

    // Обработчик клика по кнопке закрытия
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            questionsSection.classList.add('hidden');
        });
    }

    // Закрытие при клике на фон (вне контента)
    if (questionsSection) {
        questionsSection.addEventListener('click', (e) => {
            if (e.target === questionsSection) {
                questionsSection.classList.add('hidden');
            }
        });
    }
});