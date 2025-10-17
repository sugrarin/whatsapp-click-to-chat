const translations = {
    en: {
        title: 'Click to Chat - Start WhatsApp Chat Without Saving Contact',
        description: 'Start a WhatsApp chat with anyone without saving their phone number. Simple, fast, and secure way to connect via WhatsApp.',
        keywords: 'whatsapp, click to chat, whatsapp link generator, whatsapp chat, whatsapp message, whatsapp contact, whatsapp business',
        ogTitle: 'Click to Chat - Start WhatsApp Chat Without Saving Contact',
        ogDescription: 'Start a WhatsApp chat with anyone without saving their phone number. Simple, fast, and secure way to connect via WhatsApp.',
        headerText: 'Start a WhatsApp chat with anyone without saving their phone number.',
        placeholder: 'Paste any message',
        buttonText: 'Message on WhatsApp',
        howItWorksTitle: 'How it works',
        howItWorksText: 'Paste a message containing a WhatsApp number. Click on the generated link to go to the chat.',
        privacyTitle: 'Is the number transmitted anywhere?',
        privacyText: 'No, the script simply removes all unnecessary characters that are not part of the number.',
        contactTitle: 'I have a problem or an idea',
        contactText: 'You can find contacts on my website <a href="https://tima.ee/" target="_blank">tima.ee</a>, and the code <a href="https://github.com/sugrarin/whatsapp-click-to-chat" target="_blank">on GitHub</a>. Site made by Timur Sugrarin in 2025.'
    },
    ru: {
        title: 'Click to Chat - Начать чат в WhatsApp без сохранения контакта',
        description: 'Начните чат в WhatsApp с любым номером без сохранения контакта. Простой, быстрый и безопасный способ общения через WhatsApp.',
        keywords: 'whatsapp, click to chat, генератор ссылок whatsapp, чат whatsapp, сообщение whatsapp, контакт whatsapp, whatsapp business',
        ogTitle: 'Click to Chat - Начать чат в WhatsApp без сохранения контакта',
        ogDescription: 'Начните чат в WhatsApp с любым номером без сохранения контакта. Простой, быстрый и безопасный способ общения через WhatsApp.',
        headerText: 'Начните чат в WhatsApp без сохранения контакта.',
        placeholder: 'Любой текст, содержащий номер',
        buttonText: 'Написать в WhatsApp',
        howItWorksTitle: 'Как это работает',
        howItWorksText: 'Вставьте сообщение, содержащее номер WhatsApp. Нажмите на сгенерированную ссылку, чтобы перейти к чату.',
        privacyTitle: 'Номер куда-то передается?',
        privacyText: 'Нет, скрипт просто убирает все лишние символы, не относящиеся к номеру.',
        contactTitle: 'У меня есть проблема или идея',
        contactText: 'Вы можете найти контакты на моём сайте <a href="https://tima.ee/ru/" target="_blank">tima.ee</a>, а код <a href="https://github.com/sugrarin/whatsapp-click-to-chat" target="_blank">на гитхабе</a>. Сайт сделал Тимур Суграрин в 2025 году.'
    }
};

// Определение языка пользователя
function detectUserLanguage() {
    // Проверяем URL параметры
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && translations[urlLang]) {
        localStorage.setItem('preferred_language', urlLang);
        return urlLang;
    }
    
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

    // Обновляем мета-теги
    document.title = t.title;
    document.querySelector('meta[name="description"]').content = t.description;
    document.querySelector('meta[name="keywords"]').content = t.keywords;
    document.querySelector('meta[property="og:title"]').content = t.ogTitle;
    document.querySelector('meta[property="og:description"]').content = t.ogDescription;

    // Обновляем текстовые элементы
    document.querySelector('.header-text').textContent = t.headerText;
    const textInput = document.getElementById('textInput');
    textInput.placeholder = t.placeholder;
    document.querySelector('.link-text').textContent = t.buttonText;
    
    // Обновляем секцию вопросов
    document.querySelectorAll('.questions-item')[0].querySelector('h2').textContent = t.howItWorksTitle;
    document.querySelectorAll('.questions-item')[0].querySelector('p').textContent = t.howItWorksText;
    document.querySelectorAll('.questions-item')[1].querySelector('h2').textContent = t.privacyTitle;
    document.querySelectorAll('.questions-item')[1].querySelector('p').textContent = t.privacyText;
    document.querySelectorAll('.questions-item')[2].querySelector('h2').textContent = t.contactTitle;
    document.querySelectorAll('.questions-item')[2].querySelector('p').innerHTML = t.contactText;

    // Обновляем атрибут языка
    document.documentElement.lang = lang;

    // Сохраняем выбор
    localStorage.setItem('preferred_language', lang);

    // Устанавливаем фокус на поле ввода
    textInput.focus();
    
    // Очищаем URL от параметров языка, чтобы избежать циклов
    if (window.location.search.includes('lang=')) {
        const url = new URL(window.location);
        url.searchParams.delete('lang');
        window.history.replaceState({}, '', url);
    }
}

// Функция переключения языка
function switchLanguage(lang) {
    // Удаляем активный класс у всех кнопок
    document.querySelectorAll('.lang-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Добавляем активный класс к выбранной кнопке
    if (lang === 'en') {
        document.getElementById('langEn').classList.add('active');
    } else if (lang === 'ru') {
        document.getElementById('langRu').classList.add('active');
    }
    
    // Применяем язык
    applyLanguage(lang);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const userLang = detectUserLanguage();
    
    // Применяем язык
    switchLanguage(userLang);
    
    // Добавляем обработчики для кнопок переключения языка
    document.getElementById('langEn').addEventListener('click', () => {
        switchLanguage('en');
    });
    
    document.getElementById('langRu').addEventListener('click', () => {
        switchLanguage('ru');
    });
});