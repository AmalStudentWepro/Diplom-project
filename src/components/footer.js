export function footer() {
    const footer = document.createElement("footer");
    footer.className = "footer";
  
    const container = document.createElement("div");
    container.className = "container";
  
    const nav = document.createElement("nav");
    nav.className = "footer-nav";
  
    const links = [
      "Главная",
      "Новости",
      "Трейлеры",
      "Контакты",
      "Политика конфиденциальности"
    ];
  
    links.forEach(text => {
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = text;
      nav.appendChild(a);
    });
  
    const p = document.createElement("p");
    p.textContent = "Все права защищены © KinoArea";
  
    container.appendChild(nav);
    container.appendChild(p);
    footer.appendChild(container);
  
    return footer;
  }
  