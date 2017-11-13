let TOKEN = window.localStorage.getItem('TOKEN');
if (!TOKEN) {
  TOKEN = Math.random().toString(32).substr(-8);
  window.localStorage.setItem('TOKEN', TOKEN);
}
const prefix = `//${document.location.hostname}`;
export const request =  (url, options = {}) => fetch(prefix + url, { headers: { 'Authorization': TOKEN, 'Content-Type': 'application/json' }, ...options })
    .then(res => res.json());
request.post = (url, body ) => request(url, { method: 'POST', body });
request.put = (url, body ) => request(url, { method: 'PUT', body });
