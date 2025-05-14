document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phoneInput');
    const clearButton = document.getElementById('clearButton');
    const linkContainer = document.getElementById('linkContainer');
    const whatsappLink = document.getElementById('whatsappLink');
    const linkUrl = whatsappLink.querySelector('.link-url');

    // Функция для очистки номера от всех лишних символов
    const cleanPhoneNumber = (phone) => {
        return phone.replace(/[^0-9]/g, '');
    };

    // Функция для обновления ссылки
    const updateWhatsAppLink = (phone) => {
        const cleanPhone = cleanPhoneNumber(phone);
        if (cleanPhone) {
            const url = `https://wa.me/${cleanPhone}`;
            whatsappLink.href = url;
            linkUrl.textContent = url;
            linkContainer.classList.remove('hidden');
            // Сохраняем номер в localStorage
            localStorage.setItem('last_phone_number', phone);
        } else {
            linkContainer.classList.add('hidden');
            // Если поле пустое, удаляем сохраненный номер
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
        
        // Показываем/скрываем кнопку очистки
        if (value) {
            clearButton.classList.remove('hidden');
        } else {
            clearButton.classList.add('hidden');
        }

        updateWhatsAppLink(value);
    });

    // Обработчик вставки
    phoneInput.addEventListener('paste', (e) => {
        // Позволяем стандартной вставке произойти
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
        // Удаляем сохраненный номер при очистке поля
        localStorage.removeItem('last_phone_number');
        phoneInput.focus();
    });
}); 