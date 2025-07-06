const translations = {
    en: {
        title: 'Click to Chat - Start WhatsApp Chat Without Saving Contact',
        placeholder: 'Paste phone number',
        buttonText: 'Message on WhatsApp'
    },
    ru: {
        title: 'Click to Chat - Начать чат в WhatsApp без сохранения контакта',
        placeholder: 'Вставьте номер',
        buttonText: 'Открыть в WhatsApp'
    }
};

// Определение языка пользователя
function detectUserLanguage() {
    // Проверяем сохраненный выбор
    const savedLang = localStorage.getItem('preferred_language');
    if (savedLang) {
        return savedLang;
    }

    // Получаем язык браузера
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = browserLang.split('-')[0];

    // Проверяем, поддерживается ли язык
    if (translations[shortLang]) {
        localStorage.setItem('preferred_language', shortLang);
        return shortLang;
    }

    // По умолчанию английский
    return 'en';
}

// Применение языка
function applyLanguage(lang) {
    const t = translations[lang];

    // Обновляем заголовок страницы
    document.title = t.title;

    // Обновляем плейсхолдер
    const phoneInput = document.getElementById('phoneInput');
    phoneInput.placeholder = t.placeholder;

    // Обновляем текст кнопки
    document.querySelector('.link-text').textContent = t.buttonText;

    // Обновляем атрибут языка
    document.documentElement.lang = lang;

    // Сохраняем выбор
    localStorage.setItem('preferred_language', lang);

    // Устанавливаем фокус на поле ввода
    phoneInput.focus();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const userLang = detectUserLanguage();

    // Если язык русский и мы на английской странице, редиректим
    if (userLang === 'ru' && !window.location.pathname.includes('/ru')) {
        window.location.href = '/ru';
        return;
    }

    // Если язык английский и мы на русской странице, редиректим
    if (userLang === 'en' && window.location.pathname.includes('/ru')) {
        window.location.href = '/';
        return;
    }

    // Применяем язык
    applyLanguage(userLang);
}); 