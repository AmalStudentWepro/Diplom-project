export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

export function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
}
