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

  logo.append(logoImg, spanBlue, spanWhite);

  const socialIcons = document.createElement("div");
  socialIcons.className = "social-icons";

  const socialImg = document.createElement("img");
  socialImg.src = "/public/group.png";
  socialImg.alt = "Соцсети";

  socialIcons.appendChild(socialImg);

  logoBlock.append(logo, socialIcons);

  const nav = document.createElement("nav");
  nav.className = "main-nav";

  const navItems = [
    "Афиша", "Медиа", "Фильмы",
    "Актёры", "Новости", "Подборки", "Категории"
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

  rightSide.append(searchBtn, loginBtn);

  container.append(logoBlock, nav, rightSide);
  header.appendChild(container);

  const searchModal = document.createElement("div");
  searchModal.className = "search-modal";

  const searchModalContent = document.createElement("div");
  searchModalContent.className = "search-modal-content";

  const closeModal = document.createElement("button");
  closeModal.className = "close-modal";
  closeModal.textContent = "X";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Поиск...";

  const searchSubmit = document.createElement("button");
  searchSubmit.className = "search-submit";

  const searchSubmitImg = document.createElement("img");
  searchSubmitImg.src = "/public/search.png";
  searchSubmitImg.alt = "Поиск";

  searchSubmit.appendChild(searchSubmitImg);

  searchModalContent.append(closeModal, searchInput, searchSubmit);



  searchModal.append(searchModalContent);
  header.appendChild(searchModal);

  return header;
}
