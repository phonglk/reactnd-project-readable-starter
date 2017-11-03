let TOKEN = window.localStorage.getItem('TOKEN');
if (!TOKEN) {
  TOKEN = Math.random().toString(32).substr(-8);
  window.localStorage.setItem('TOKEN', TOKEN);
}
const prefix = `//${document.location.hostname}:3001`;
export const request =  (url) => fetch(prefix + url, { headers: { 'Authorization': TOKEN }})
    .then(res => res.json());
