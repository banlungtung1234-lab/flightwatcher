// =========================================================
// FlightWatcher Admin Authentication (front-end demo)
// FIT4015 permits a static front-end only, so this module
// protects the admin UI with a browser-side session.
// IMPORTANT: this is not a replacement for server-side auth.
// =========================================================
(() => {
    'use strict';

    const SESSION_KEY = 'fw_admin_session';
    const PERSISTENT_KEY = 'fw_admin_persistent_session';
    const ATTEMPT_KEY = 'fw_admin_login_attempts';
    const REDIRECT_KEY = 'fw_admin_redirect_after_login';
    const SESSION_HOURS = 8;
    const REMEMBER_DAYS = 7;
    const MAX_ATTEMPTS = 5;
    const LOCK_SECONDS = 30;

    // SHA-256 hashes for the demo account supplied for this assignment.
    // Username: admin | Password: admin36
    const USERNAME_HASH = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';
    const PASSWORD_HASH = '5d45916dd43b243c57384b22a6a94ad391074f3cd84bdb98d69a3c70bf014946';

    function safeParse(value, fallback = null) {
        try { return JSON.parse(value); } catch (_) { return fallback; }
    }

    function now() { return Date.now(); }

    function storageGet(storage, key) {
        try { return storage.getItem(key); } catch { return null; }
    }

    function storageSet(storage, key, value) {
        try { storage.setItem(key, value); return true; } catch { return false; }
    }

    function storageRemove(storage, key) {
        try { storage.removeItem(key); return true; } catch { return false; }
    }

    async function sha256(value) {
        const data = new TextEncoder().encode(String(value));
        const digest = await crypto.subtle.digest('SHA-256', data);
        return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
    }

    function randomId() {
        if (crypto.randomUUID) return crypto.randomUUID();
        const bytes = crypto.getRandomValues(new Uint8Array(16));
        return [...bytes].map(byte => byte.toString(16).padStart(2, '0')).join('');
    }

    function readSession() {
        const sessionValue = storageGet(sessionStorage, SESSION_KEY);
        const persistentValue = storageGet(localStorage, PERSISTENT_KEY);
        const session = safeParse(sessionValue) || safeParse(persistentValue);
        if (!session || session.username !== 'admin' || !Number.isFinite(Number(session.expiresAt))) return null;
        if (Number(session.expiresAt) <= now()) {
            clearSession();
            return null;
        }
        return session;
    }

    function saveSession(session, remember) {
        clearSession();
        const key = remember ? PERSISTENT_KEY : SESSION_KEY;
        const storage = remember ? localStorage : sessionStorage;
        if (!storageSet(storage, key, JSON.stringify(session))) throw new Error('Không thể lưu phiên đăng nhập trên trình duyệt.');
    }

    function clearSession() {
        storageRemove(sessionStorage, SESSION_KEY);
        storageRemove(localStorage, PERSISTENT_KEY);
    }

    function readAttempts() {
        const state = safeParse(storageGet(localStorage, ATTEMPT_KEY), { count: 0, lockedUntil: 0 });
        if (!state || typeof state !== 'object') return { count: 0, lockedUntil: 0 };
        if (Number(state.lockedUntil) && Number(state.lockedUntil) <= now()) {
            storageRemove(localStorage, ATTEMPT_KEY);
            return { count: 0, lockedUntil: 0 };
        }
        return { count: Number(state.count) || 0, lockedUntil: Number(state.lockedUntil) || 0 };
    }

    function writeAttempts(state) {
        storageSet(localStorage, ATTEMPT_KEY, JSON.stringify(state));
    }

    function registerFailure() {
        const state = readAttempts();
        const count = state.count + 1;
        const lockedUntil = count >= MAX_ATTEMPTS ? now() + LOCK_SECONDS * 1000 : 0;
        const next = { count: lockedUntil ? 0 : count, lockedUntil };
        writeAttempts(next);
        return next;
    }

    function resetAttempts() {
        storageRemove(localStorage, ATTEMPT_KEY);
    }

    function getLockStatus() {
        const state = readAttempts();
        return {
            locked: state.lockedUntil > now(),
            seconds: Math.max(0, Math.ceil((state.lockedUntil - now()) / 1000)),
            remainingAttempts: Math.max(0, MAX_ATTEMPTS - state.count)
        };
    }

    async function login(username, password, remember = false) {
        const lock = getLockStatus();
        if (lock.locked) return { ok: false, code: 'LOCKED', seconds: lock.seconds };

        const cleanUsername = String(username || '').trim().toLowerCase();
        const cleanPassword = String(password || '');
        if (!cleanUsername || !cleanPassword) return { ok: false, code: 'REQUIRED' };

        const [usernameHash, passwordHash] = await Promise.all([sha256(cleanUsername), sha256(cleanPassword)]);
        const valid = usernameHash === USERNAME_HASH && passwordHash === PASSWORD_HASH;
        if (!valid) {
            const state = registerFailure();
            if (state.lockedUntil) return { ok: false, code: 'LOCKED', seconds: LOCK_SECONDS };
            return { ok: false, code: 'INVALID', remainingAttempts: MAX_ATTEMPTS - state.count };
        }

        resetAttempts();
        const duration = remember ? REMEMBER_DAYS * 24 * 60 * 60 * 1000 : SESSION_HOURS * 60 * 60 * 1000;
        const session = {
            id: randomId(),
            username: 'admin',
            displayName: 'Quản trị viên',
            role: 'Administrator',
            issuedAt: now(),
            expiresAt: now() + duration,
            persistent: Boolean(remember)
        };
        saveSession(session, remember);
        return { ok: true, session };
    }

    function logout(reason = 'logout') {
        clearSession();
        const query = reason ? `?reason=${encodeURIComponent(reason)}` : '';
        window.location.replace(`login.html${query}`);
    }

    function requireAuth(options = {}) {
        const session = readSession();
        if (session) return session;
        if (options.rememberTarget !== false) {
            const target = `${location.pathname.split('/').pop() || 'admin.html'}${location.search}${location.hash}`;
            storageSet(sessionStorage, REDIRECT_KEY, target);
        }
        const next = encodeURIComponent(location.pathname.split('/').pop() || 'admin.html');
        window.location.replace(`login.html?next=${next}`);
        return null;
    }

    function consumeRedirect(defaultPage = 'admin.html') {
        const queryNext = new URLSearchParams(location.search).get('next');
        const stored = storageGet(sessionStorage, REDIRECT_KEY);
        storageRemove(sessionStorage, REDIRECT_KEY);
        const candidate = queryNext || stored || defaultPage;
        return /^[a-zA-Z0-9._-]+(?:[?#].*)?$/.test(candidate) ? candidate : defaultPage;
    }

    function getSessionRemaining() {
        const session = readSession();
        return session ? Math.max(0, Number(session.expiresAt) - now()) : 0;
    }

    window.FlightWatcherAuth = Object.freeze({
        login,
        logout,
        requireAuth,
        isAuthenticated: () => Boolean(readSession()),
        getSession: readSession,
        getSessionRemaining,
        getLockStatus,
        consumeRedirect,
        clearSession
    });
})();
