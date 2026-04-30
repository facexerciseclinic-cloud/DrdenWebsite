// ============================================
// ADMIN AUTHENTICATION (Client-side only)
// ============================================
// IMPORTANT: This is client-side auth — suitable only for low-stakes admin
// panels managing static-site content. Anyone with the source can read these
// constants. For production-grade security, move auth to a server.
//
// Default credentials:
//   Username: admin
//   Password: Drden@2026
// To change: update ADMIN_USERNAME below and replace ADMIN_PASSWORD_HASH with
// SHA-256 of your new password (use any online SHA-256 tool).
// ============================================

const ADMIN_USERNAME = 'admin';
// SHA-256 hash of the password
const ADMIN_PASSWORD_HASH = '2dc69d925b81c6fff85852863716470c3e1cbb753aed7e5d5f3203ac3027a5b8';

const AUTH_KEY = 'drden_admin_auth';
const AUTH_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

async function sha256Hex(text) {
    const data = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(buf))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

async function adminLogin(username, password) {
    if (username !== ADMIN_USERNAME) return false;
    const hash = await sha256Hex(password);
    if (hash !== ADMIN_PASSWORD_HASH) return false;
    const token = {
        user: username,
        ts: Date.now(),
        sig: await sha256Hex(username + ':' + Date.now() + ':' + ADMIN_PASSWORD_HASH)
    };
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(token));
    return true;
}

function isAdminAuthenticated() {
    try {
        const raw = sessionStorage.getItem(AUTH_KEY);
        if (!raw) return false;
        const token = JSON.parse(raw);
        if (!token || token.user !== ADMIN_USERNAME) return false;
        if (Date.now() - token.ts > AUTH_TTL_MS) {
            sessionStorage.removeItem(AUTH_KEY);
            return false;
        }
        return true;
    } catch {
        return false;
    }
}

function adminLogout() {
    sessionStorage.removeItem(AUTH_KEY);
    window.location.replace('/admin/login');
}

// Auto-guard: if this script is loaded on any page other than login,
// redirect unauthenticated users to login page
(function guardAdminPage() {
    const path = window.location.pathname.toLowerCase();
    const isLoginPage = path.endsWith('/admin/login') || path.endsWith('/admin/login.html') || path.endsWith('/login.html');
    if (!isLoginPage && !isAdminAuthenticated()) {
        window.location.replace('/admin/login');
    }
})();
