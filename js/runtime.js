// =========================================================
// FlightWatcher Runtime Guard 8.0
// Shared safety helpers for storage, UI overlays and errors.
// =========================================================
(() => {
    'use strict';

    const memoryFallback = new Map();

    function safeGet(key, fallback = null) {
        try {
            const value = localStorage.getItem(key);
            return value === null ? (memoryFallback.has(key) ? memoryFallback.get(key) : fallback) : value;
        } catch {
            return memoryFallback.has(key) ? memoryFallback.get(key) : fallback;
        }
    }

    function safeSet(key, value) {
        const normalized = String(value);
        memoryFallback.set(key, normalized);
        try {
            localStorage.setItem(key, normalized);
            return true;
        } catch {
            return false;
        }
    }

    function safeRemove(key) {
        memoryFallback.delete(key);
        try {
            localStorage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }

    function readJSON(key, fallback) {
        try {
            const raw = safeGet(key, '');
            if (!raw) return fallback;
            return JSON.parse(raw);
        } catch {
            return fallback;
        }
    }

    function writeJSON(key, value) {
        try {
            return safeSet(key, JSON.stringify(value));
        } catch {
            return false;
        }
    }

    function hasVisibleOverlay() {
        return Boolean(document.querySelector('.modal.show, .offcanvas.show, .modal.showing, .offcanvas.showing'));
    }

    function releaseDocumentLock(options = {}) {
        const force = Boolean(options.force);
        if (!force && hasVisibleOverlay()) return false;

        document.querySelectorAll('.modal-backdrop, .offcanvas-backdrop').forEach(node => node.remove());
        document.body.classList.remove('modal-open', 'offcanvas-open');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');
        document.documentElement.style.removeProperty('overflow');
        return true;
    }

    function deferRelease(force = false) {
        window.setTimeout(() => releaseDocumentLock({ force }), 80);
    }

    document.addEventListener('hidden.bs.modal', () => deferRelease(false));
    document.addEventListener('hidden.bs.offcanvas', () => deferRelease(false));
    window.addEventListener('pageshow', () => deferRelease(false));
    window.addEventListener('pagehide', () => releaseDocumentLock({ force: true }));

    window.addEventListener('unhandledrejection', event => {
        const reason = event.reason;
        if (reason?.name === 'AbortError') return;
        console.error('[FlightWatcher] Unhandled promise rejection:', reason);
    });

    window.addEventListener('error', event => {
        if (!event.error) return;
        console.error('[FlightWatcher] Runtime error:', event.error);
    });

    window.FWRuntime = Object.freeze({
        version: '8.2.0',
        storage: Object.freeze({ safeGet, safeSet, safeRemove, readJSON, writeJSON }),
        releaseDocumentLock,
        deferRelease,
        hasVisibleOverlay
    });
})();
