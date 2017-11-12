let TOKEN = window.localStorage.getItem('TOKEN');
if (!TOKEN) {
  TOKEN = Math.random().toString(32).substr(-8);
  window.localStorage.setItem('TOKEN', TOKEN);
}
const prefix = `//${document.location.hostname}:3001`;
export const request =  (url, options = {}) => fetch(prefix + url, { headers: { 'Authorization': TOKEN, 'Content-Type': 'application/json' }, ...options })
    .then(res => res.json());

export const GET = (url) => request(url);
export const POST = (url, body) => request(url, { method: 'POST', body });
export const PUT = (url, body) => request(url, { method: 'PUT', body });
export const DELETE = (url, body) => request(url, { method: 'DELETE' });
