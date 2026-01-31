// js/auth.js
const AUTH_KEY = 'revivalark_auth_v1';

function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
  } catch {
    return null;
  }
}

function isSignedIn() {
  const a = getAuth();
  return !!(a && a.token);
}

function signInLocal(profile) {
  const payload = {
    token: 'demo_' + Math.random().toString(16).slice(2),
    profile: profile || { firstName: 'Donor', lastName: 'Anonymous', email: null },
    signedInAt: Date.now()
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
  return payload;
}

function signOutLocal() {
  localStorage.removeItem(AUTH_KEY);
}

function requireAuthThenGo(targetUrl) {
  if (isSignedIn()) {
    window.location.href = targetUrl;
    return;
  }
  const returnTo = encodeURIComponent(targetUrl);
  window.location.href = `signin.html?returnTo=${returnTo}`;
}

function requireAuthOnLoad() {
  if (!isSignedIn()) {
    const here = encodeURIComponent(location.pathname.split('/').pop() || 'payment.html');
    window.location.href = `signin.html?returnTo=${here}`;
  }
}
