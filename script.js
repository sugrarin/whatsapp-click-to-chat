document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phoneInput');
    const clearButton = document.getElementById('clearButton');
    const linkContainer = document.getElementById('linkContainer');
    const whatsappLink = document.getElementById('whatsappLink');
    const linkUrl = whatsappLink.querySelector('.link-url');

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
        phoneInput.value = savedPhone;
        updateWhatsAppLink(savedPhone);
        clearButton.classList.remove('hidden');
    }

    // Обработчик ввода
    phoneInput.addEventListener('input', (e) => {
        const value = e.target.value;

        if (value) {
            clearButton.classList.remove('hidden');
        } else {
            clearButton.classList.add('hidden');
        }

        updateWhatsAppLink(value);
    });

    // Обработчик вставки
    phoneInput.addEventListener('paste', (e) => {
        setTimeout(() => {
            const value = phoneInput.value;
            if (value) {
                clearButton.classList.remove('hidden');
            }
            updateWhatsAppLink(value);
        }, 0);
    });

    // Обработчик клика по кнопке очистки
    clearButton.addEventListener('click', () => {
        phoneInput.value = '';
        clearButton.classList.add('hidden');
        linkContainer.classList.add('hidden');
        localStorage.removeItem('last_phone_number');
        phoneInput.focus();
    });
});