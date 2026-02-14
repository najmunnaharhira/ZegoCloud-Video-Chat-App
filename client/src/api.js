/**
 * API client for production-ready requests.
 * Uses VITE_API_URL in production (same-origin or proxy when empty).
 */

const API_BASE = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL != null
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
  : '';

const DEFAULT_TIMEOUT_MS = 15000;

async function fetchWithTimeout(url, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: options.headers || {},
    });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    if (err.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw err;
  }
}

/**
 * Fetch Zego token from backend.
 * @param {{ userID: string, userName: string }} params
 * @returns {Promise<{ token: string, appID: number, userID: string }>}
 */
export async function fetchZegoToken({ userID, userName }) {
  const q = new URLSearchParams();
  if (userID) q.set('userID', userID);
  if (userName) q.set('userName', userName);
  const url = `${API_BASE}/api/zego-token?${q.toString()}`;
  const res = await fetchWithTimeout(url, { method: 'GET' });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data.error || data.hint || `Server error (${res.status})`;
    throw new Error(msg);
  }

  if (!data.token || data.appID == null) {
    throw new Error('Invalid token response from server.');
  }

  return {
    token: data.token,
    appID: Number(data.appID),
    userID: data.userID || userID,
  };
}

/**
 * Health check (optional).
 */
export async function healthCheck() {
  const res = await fetchWithTimeout(`${API_BASE}/api/health`, { method: 'GET' }, 5000);
  return res.ok;
}

export { API_BASE };
