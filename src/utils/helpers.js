export function redirect(path) {
  window.location.href = path.startsWith("/") ? path : "/" + path;
}
