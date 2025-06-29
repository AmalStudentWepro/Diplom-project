export function header() {
    const header = document.createElement("header");
    header.className = "header";
  
    const container = document.createElement("div");
    container.className = "container header-container";
  
    const logoBlock = document.createElement("div");
    logoBlock.className = "logo-block";
  
    const logo = document.createElement("div");
    logo.className = "logo";
  
    const logoImg = document.createElement("img");
    logoImg.src = "/public/logo.png";
    logoImg.alt = "Лого";
  
    const spanBlue = document.createElement("span");
    spanBlue.className = "blue";
    spanBlue.textContent = "Kino";
  
    const spanWhite = document.createElement("span");
    spanWhite.className = "white";
    spanWhite.textContent = "area";
  
    logo.appendChild(logoImg);
    logo.appendChild(spanBlue);
    logo.appendChild(spanWhite);
  
    const socialIcons = document.createElement("div");
    socialIcons.className = "social-icons";
  
    const socialImg = document.createElement("img");
    socialImg.src = "/public/group.png";
    socialImg.alt = "Соцсети";
  
    socialIcons.appendChild(socialImg);
  
    logoBlock.appendChild(logo);
    logoBlock.appendChild(socialIcons);
  
    const nav = document.createElement("nav");
    nav.className = "main-nav";
  
    const navItems = [
      "Афиша",
      "Медиа",
      "Фильмы",
      "Актёры",
      "Новости",
      "Подборки",
      "Категории"
    ];
  
    navItems.forEach(text => {
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = text;
      nav.appendChild(link);
    });
  
    const rightSide = document.createElement("div");
    rightSide.className = "right-side";
  
    const searchBtn = document.createElement("button");
    searchBtn.className = "search-btn";
  
    const searchImg = document.createElement("img");
    searchImg.src = "/public/search.png";
    searchImg.alt = "";
  
    searchBtn.appendChild(searchImg);
  
    const loginBtn = document.createElement("button");


    loginBtn.className = "login-btn";
    loginBtn.textContent = "Войти";
    rightSide.appendChild(searchBtn);
    rightSide.appendChild(loginBtn);
    container.appendChild(logoBlock);
    container.appendChild(nav);
    container.appendChild(rightSide);
    header.appendChild(container);
  
    return header;
  }
  