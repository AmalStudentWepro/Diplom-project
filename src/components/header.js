import { redirect } from "../utils/helpers";
import { getCookie } from "../utils/cookie";
import { api } from "../utils/api";

export function header() {
  const header = document.createElement("header");
  header.className = "header";

  const container = document.createElement("div");
  container.className = "container header-container";

  const logoBlock = document.createElement("div");
  logoBlock.className = "logo-block"; 
  logoBlock.onclick = () => redirect("/");

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
  const navItems = ["Афиша", "Медиа", "Фильмы", "Актёры", "Новости", "Подборки", "Категории"];
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
  searchImg.alt = "Поиск";
  searchBtn.appendChild(searchImg);

  const userName = getCookie("userName");
  if (userName) {
    const userLink = document.createElement("a");
    userLink.className = "user-link";
    userLink.textContent = userName;
    userLink.href = "/src/pages/profile/index.html";
    rightSide.append(searchBtn, userLink);
  } else {
    const loginBtn = document.createElement("button");
    loginBtn.className = "login-btn";
    loginBtn.textContent = "Войти";
    loginBtn.onclick = () => redirect("/signin");
    rightSide.append(searchBtn, loginBtn);
  }

  container.append(logoBlock, nav, rightSide);
  header.appendChild(container);

  const searchModal = document.createElement("div");
  searchModal.className = "search-modal";

  const searchModalContent = document.createElement("div");
  searchModalContent.className = "search-modal-content";

  const closeModal = document.createElement("button");
  closeModal.className = "close-modal";
  closeModal.textContent = "×";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Поиск...";

  const tabsContainer = document.createElement("div");
  tabsContainer.className = "search-tabs";
  tabsContainer.innerHTML = `
    <button data-type="movie" class="active">Фильмы</button>
    <button data-type="tv">Сериалы</button>
    <button data-type="person">Персоны</button>
    <div class="tab-underline"></div>
  `;

  const resultsContainer = document.createElement("div");
  resultsContainer.className = "search-results";

  searchModalContent.append(closeModal, searchInput, tabsContainer, resultsContainer);
  searchModal.append(searchModalContent);
  header.appendChild(searchModal);

  const style = document.createElement("style");
  style.textContent = `
    .search-tabs {
      display: flex;
      position: relative;
      gap: 10px;
      margin-top: 10px;
    }
    .search-tabs button {
      background: none;
      border: none;
      color: white;
      font-size: 16px;
      padding: 6px 12px;
      cursor: pointer;
    }
    .search-tabs button.active {
      color: #e7ff1e;
    }
    .tab-underline {
      position: absolute;
      bottom: 0;
      height: 2px;
      background: #e7ff1e;
      transition: all 0.3s ease;
    }
    .search-results {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 15px;
      max-height: 400px;
      overflow-y: auto;
      width: 100%;
    }
  `;
  document.head.appendChild(style);

  let activeType = "movie";
  const tabButtons = tabsContainer.querySelectorAll("button");
  const underline = tabsContainer.querySelector(".tab-underline");

  function updateUnderline() {
    const activeBtn = tabsContainer.querySelector(".active");
    underline.style.width = activeBtn.offsetWidth + "px";
    underline.style.left = activeBtn.offsetLeft + "px";
  }
  updateUnderline();
  window.addEventListener("resize", updateUnderline);

  tabButtons.forEach(btn => {
    btn.onclick = () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeType = btn.dataset.type;
      updateUnderline();
      if (searchInput.value.trim()) {
        doSearch(searchInput.value.trim());
      }
    };
  });

  searchBtn.onclick = () => {
    searchModal.classList.add("active");
    searchInput.value = "";
    resultsContainer.innerHTML = "";
    searchInput.focus();
  };
  closeModal.onclick = () => searchModal.classList.remove("active");

  searchInput.onkeyup = (e) => {
    const query = searchInput.value.trim();
    if (!query) {
      resultsContainer.innerHTML = "";
      return;
    }
    if (e.key === "Enter") {
      doSearch(query);
      return;
    }
    resultsContainer.innerHTML = "<p style='color:white'>Загрузка...</p>";
    clearTimeout(searchInput._timer);
    searchInput._timer = setTimeout(() => doSearch(query), 400);
  };

  async function doSearch(query) {
    resultsContainer.innerHTML = "<p style='color:white'>Загрузка...</p>";
    try {
      const res = await api.get(`/search/${activeType}`, { params: { query } });
      renderResults(res.data.results);
    } catch (err) {
      console.error(err);
      resultsContainer.innerHTML = "<p style='color:white'>Ошибка при поиске.</p>";
    }
  }

  function renderResults(results) {
    resultsContainer.innerHTML = "";
    if (!results.length) {
      resultsContainer.innerHTML = "<p style='color:white'>Ничего не найдено.</p>";
      return;
    }
    results.forEach(r => {
      const div = document.createElement("div");
      div.className = "result-item";


      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w92${r.poster_path || r.profile_path}`;


      const text = document.createElement("div");
      const title = r.title || r.name;
      const date = r.release_date || r.first_air_date || "";
      text.innerHTML = `<strong>${title}</strong><p style="font-size:12px;color:gray">${date}</p>`;

      div.append(img, text);
      resultsContainer.append(div);
    });
  }

  return header;
}
