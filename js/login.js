// FlightWatcher secure admin login UI
(() => {
    'use strict';

    const i18n = {
        vi: {
            title: 'Đăng nhập quản trị', subtitle: 'Truy cập trung tâm vận hành FlightWatcher',
            username: 'Tài khoản', password: 'Mật khẩu', remember: 'Duy trì đăng nhập trên thiết bị này',
            signIn: 'Đăng nhập', signingIn: 'Đang xác thực...', required: 'Vui lòng nhập đầy đủ tài khoản và mật khẩu.',
            invalid: 'Tài khoản hoặc mật khẩu không chính xác. Bạn còn {count} lần thử.',
            locked: 'Đăng nhập tạm khóa. Vui lòng thử lại sau {seconds} giây.', success: 'Xác thực thành công. Đang mở trang quản trị…',
            security: 'Khu vực quản trị được bảo vệ', securityText: 'Phiên đăng nhập có thời hạn và sẽ được kiểm tra trước khi tải dữ liệu MockAPI.',
            publicSite: 'Về trang khách', showPassword: 'Hiện mật khẩu', hidePassword: 'Ẩn mật khẩu',
            themeAuto: 'Tự động', themeLight: 'Sáng', themeDark: 'Tối', language: 'Ngôn ngữ',
            demoNotice: 'Bảo mật dành cho bài tập front-end', demoText: 'Ứng dụng tĩnh không có backend; cơ chế này bảo vệ giao diện demo, không bảo vệ trực tiếp endpoint MockAPI.'
        },
        en: {
            title: 'Administrator sign in', subtitle: 'Access the FlightWatcher operations center',
            username: 'Username', password: 'Password', remember: 'Keep me signed in on this device',
            signIn: 'Sign in', signingIn: 'Verifying...', required: 'Enter both your username and password.',
            invalid: 'Incorrect username or password. {count} attempts remaining.',
            locked: 'Sign-in is temporarily locked. Try again in {seconds} seconds.', success: 'Authentication successful. Opening the admin console…',
            security: 'Protected administration area', securityText: 'Your session is time-limited and verified before MockAPI data is loaded.',
            publicSite: 'Back to public site', showPassword: 'Show password', hidePassword: 'Hide password',
            themeAuto: 'Auto', themeLight: 'Light', themeDark: 'Dark', language: 'Language',
            demoNotice: 'Front-end coursework security', demoText: 'This static project has no backend; this mechanism protects the demo UI, not the public MockAPI endpoint itself.'
        },
        zh: {
            title:'管理员登录', subtitle:'进入 FlightWatcher 运营中心', username:'用户名', password:'密码', remember:'在此设备保持登录', signIn:'登录', signingIn:'正在验证…', required:'请输入用户名和密码。', invalid:'用户名或密码错误，还可尝试 {count} 次。', locked:'登录暂时锁定，请在 {seconds} 秒后重试。', success:'验证成功，正在打开管理后台…', security:'受保护的管理区域', securityText:'会话有时间限制，加载 MockAPI 数据前会进行验证。', publicSite:'返回公共网站', showPassword:'显示密码', hidePassword:'隐藏密码', themeAuto:'自动', themeLight:'浅色', themeDark:'深色', language:'语言', demoNotice:'前端演示安全', demoText:'该静态项目没有后端；此机制仅保护演示界面，不直接保护公开的 MockAPI 接口。'
        },
        de: {
            title:'Administrator-Anmeldung', subtitle:'Zugang zur FlightWatcher-Betriebszentrale', username:'Benutzername', password:'Passwort', remember:'Auf diesem Gerät angemeldet bleiben', signIn:'Anmelden', signingIn:'Wird geprüft…', required:'Benutzername und Passwort eingeben.', invalid:'Benutzername oder Passwort falsch. Noch {count} Versuche.', locked:'Anmeldung vorübergehend gesperrt. In {seconds} Sekunden erneut versuchen.', success:'Authentifizierung erfolgreich. Adminbereich wird geöffnet…', security:'Geschützter Administrationsbereich', securityText:'Die Sitzung ist zeitlich begrenzt und wird vor dem Laden der MockAPI-Daten geprüft.', publicSite:'Zur öffentlichen Seite', showPassword:'Passwort anzeigen', hidePassword:'Passwort ausblenden', themeAuto:'Automatisch', themeLight:'Hell', themeDark:'Dunkel', language:'Sprache', demoNotice:'Sicherheit für das Front-End-Projekt', demoText:'Dieses statische Projekt hat kein Backend; der Mechanismus schützt die Demo-Oberfläche, nicht den öffentlichen MockAPI-Endpunkt.'
        },
        ru: {
            title:'Вход администратора', subtitle:'Доступ к центру управления FlightWatcher', username:'Имя пользователя', password:'Пароль', remember:'Оставаться в системе на этом устройстве', signIn:'Войти', signingIn:'Проверка…', required:'Введите имя пользователя и пароль.', invalid:'Неверное имя пользователя или пароль. Осталось попыток: {count}.', locked:'Вход временно заблокирован. Повторите через {seconds} сек.', success:'Проверка успешна. Открываем панель администратора…', security:'Защищённая административная зона', securityText:'Сессия ограничена по времени и проверяется перед загрузкой данных MockAPI.', publicSite:'Вернуться на сайт', showPassword:'Показать пароль', hidePassword:'Скрыть пароль', themeAuto:'Авто', themeLight:'Светлая', themeDark:'Тёмная', language:'Язык', demoNotice:'Безопасность демонстрационного Front-End', demoText:'У статического проекта нет backend; механизм защищает интерфейс демонстрации, но не публичный endpoint MockAPI.'
        },
        th: {
            title:'เข้าสู่ระบบผู้ดูแล', subtitle:'เข้าสู่ศูนย์ปฏิบัติการ FlightWatcher', username:'ชื่อผู้ใช้', password:'รหัสผ่าน', remember:'คงสถานะเข้าสู่ระบบบนอุปกรณ์นี้', signIn:'เข้าสู่ระบบ', signingIn:'กำลังตรวจสอบ…', required:'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน', invalid:'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง เหลือ {count} ครั้ง', locked:'ล็อกการเข้าสู่ระบบชั่วคราว ลองอีกครั้งใน {seconds} วินาที', success:'ยืนยันสำเร็จ กำลังเปิดแผงผู้ดูแล…', security:'พื้นที่ผู้ดูแลที่ได้รับการป้องกัน', securityText:'เซสชันมีเวลาจำกัดและจะตรวจสอบก่อนโหลดข้อมูล MockAPI', publicSite:'กลับหน้าเว็บไซต์', showPassword:'แสดงรหัสผ่าน', hidePassword:'ซ่อนรหัสผ่าน', themeAuto:'อัตโนมัติ', themeLight:'สว่าง', themeDark:'มืด', language:'ภาษา', demoNotice:'ความปลอดภัยสำหรับโปรเจกต์ Front-End', demoText:'โปรเจกต์แบบสแตติกไม่มี backend กลไกนี้ป้องกันหน้าสาธิต แต่ไม่ได้ป้องกัน endpoint MockAPI สาธารณะโดยตรง'
        }
    };

    const savedLanguage = localStorage.getItem('lang');
    let lang = i18n[savedLanguage] ? savedLanguage : 'vi';
    let lockTimer = null;

    function tr(key, vars = {}) {
        let value = i18n[lang][key] || key;
        Object.entries(vars).forEach(([name, replacement]) => { value = value.replaceAll(`{${name}}`, String(replacement)); });
        return value;
    }

    function resolveTheme(mode) {
        return mode === 'auto' ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : mode;
    }

    function applyTheme(mode, persist = true) {
        const safeMode = ['auto', 'light', 'dark'].includes(mode) ? mode : 'auto';
        const resolved = resolveTheme(safeMode);
        document.documentElement.dataset.theme = resolved;
        document.documentElement.dataset.themeMode = safeMode;
        document.documentElement.style.colorScheme = resolved;
        document.body.dataset.theme = resolved;
        if (persist) {
            localStorage.setItem('theme_mode', safeMode);
            localStorage.setItem('theme', resolved);
        }
        document.querySelectorAll('[data-login-theme]').forEach(button => button.classList.toggle('active', button.dataset.loginTheme === safeMode));
    }

    function applyLanguage(value) {
        lang = i18n[value] ? value : 'vi';
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        document.title = `${tr('title')} | FlightWatcher`;
        document.querySelectorAll('[data-login-i18n]').forEach(element => { element.textContent = tr(element.dataset.loginI18n); });
        document.querySelectorAll('[data-login-placeholder]').forEach(element => { element.placeholder = tr(element.dataset.loginPlaceholder); });
        const selector = document.getElementById('login-language');
        if (selector) selector.value = lang;
        const passwordButton = document.getElementById('toggle-password');
        if (passwordButton) passwordButton.setAttribute('aria-label', passwordButton.dataset.visible === 'true' ? tr('hidePassword') : tr('showPassword'));
        refreshLockMessage();
    }

    function setMessage(message, type = 'info') {
        const box = document.getElementById('login-message');
        box.className = `login-message ${type}`;
        box.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'danger' ? 'fa-circle-exclamation' : 'fa-circle-info'}"></i><span>${message}</span>`;
        box.hidden = false;
    }

    function clearMessage() {
        document.getElementById('login-message').hidden = true;
    }

    function refreshLockMessage() {
        const status = FlightWatcherAuth.getLockStatus();
        const submit = document.getElementById('login-submit');
        submit.disabled = status.locked;
        if (!status.locked) {
            if (lockTimer) clearInterval(lockTimer);
            lockTimer = null;
            return;
        }
        setMessage(tr('locked', { seconds: status.seconds }), 'danger');
        if (!lockTimer) {
            lockTimer = setInterval(() => {
                const next = FlightWatcherAuth.getLockStatus();
                if (!next.locked) {
                    clearInterval(lockTimer);
                    lockTimer = null;
                    submit.disabled = false;
                    clearMessage();
                    document.getElementById('login-username').focus();
                    return;
                }
                setMessage(tr('locked', { seconds: next.seconds }), 'danger');
            }, 1000);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        clearMessage();
        const username = document.getElementById('login-username');
        const password = document.getElementById('login-password');
        const remember = document.getElementById('remember-session').checked;
        const submit = document.getElementById('login-submit');

        [username, password].forEach(input => input.classList.remove('is-invalid'));
        if (!username.value.trim() || !password.value) {
            if (!username.value.trim()) username.classList.add('is-invalid');
            if (!password.value) password.classList.add('is-invalid');
            setMessage(tr('required'), 'danger');
            return;
        }

        submit.disabled = true;
        const original = submit.innerHTML;
        submit.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span>${tr('signingIn')}</span>`;
        await new Promise(resolve => setTimeout(resolve, 450));
        const result = await FlightWatcherAuth.login(username.value, password.value, remember);

        if (result.ok) {
            setMessage(tr('success'), 'success');
            submit.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>${tr('signIn')}</span>`;
            setTimeout(() => window.location.replace(FlightWatcherAuth.consumeRedirect('admin.html')), 650);
            return;
        }

        submit.disabled = false;
        submit.innerHTML = original;
        password.value = '';
        password.focus();
        password.classList.add('is-invalid');
        if (result.code === 'LOCKED') {
            refreshLockMessage();
        } else if (result.code === 'REQUIRED') {
            setMessage(tr('required'), 'danger');
        } else {
            setMessage(tr('invalid', { count: result.remainingAttempts ?? 0 }), 'danger');
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (FlightWatcherAuth.isAuthenticated()) {
            window.location.replace(FlightWatcherAuth.consumeRedirect('admin.html'));
            return;
        }

        const savedMode = localStorage.getItem('theme_mode') || 'auto';
        applyTheme(savedMode, false);
        applyLanguage(lang);
        document.querySelectorAll('[data-login-theme]').forEach(button => button.addEventListener('click', () => applyTheme(button.dataset.loginTheme)));
        document.getElementById('login-language').addEventListener('change', event => applyLanguage(event.target.value));
        document.getElementById('login-form').addEventListener('submit', handleSubmit);
        document.querySelectorAll('#login-form input').forEach(input => input.addEventListener('input', () => input.classList.remove('is-invalid')));

        document.getElementById('toggle-password').addEventListener('click', event => {
            const password = document.getElementById('login-password');
            const visible = password.type === 'text';
            password.type = visible ? 'password' : 'text';
            event.currentTarget.dataset.visible = String(!visible);
            event.currentTarget.innerHTML = `<i class="fa-regular ${visible ? 'fa-eye' : 'fa-eye-slash'}"></i>`;
            event.currentTarget.setAttribute('aria-label', visible ? tr('showPassword') : tr('hidePassword'));
        });

        const media = matchMedia('(prefers-color-scheme: dark)');
        const syncAuto = () => { if ((localStorage.getItem('theme_mode') || 'auto') === 'auto') applyTheme('auto', false); };
        media.addEventListener?.('change', syncAuto);
        refreshLockMessage();
        document.getElementById('login-username').focus();
    });
})();
