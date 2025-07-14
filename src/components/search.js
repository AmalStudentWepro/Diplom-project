export function initSearch() {
  const searchBtn = document.querySelector(".search-btn");
  const closeModal = document.querySelector(".close-modal");
  const modal = document.querySelector(".search-modal");
  const input = modal.querySelector("input");
  const submit = modal.querySelector(".search-submit");
  const searchContent = modal.querySelector(".search-modal-content");

  searchContent.style.display = "flex";
  searchContent.style.flexDirection = "column";
  searchContent.style.alignItems = "stretch";
  searchContent.style.gap = "10px";
  searchContent.style.width = "100%";

  modal.style.alignItems = "flex-start";
  modal.style.paddingTop = "120px";

  const inputWrapper = document.createElement("div");
  inputWrapper.style.display = "flex";
  inputWrapper.style.gap = "10px";
  inputWrapper.style.width = "100%";
  inputWrapper.appendChild(input);
  inputWrapper.appendChild(submit);

  searchContent.innerHTML = ""; 
  searchContent.appendChild(inputWrapper);

  const tabsContainer = document.createElement("div");
  tabsContainer.className = "search-tabs";
  tabsContainer.style.display = "flex";
  tabsContainer.style.justifyContent = "center";
  tabsContainer.style.position = "relative";
  tabsContainer.style.gap = "20px";
  tabsContainer.style.marginTop = "5px";
  tabsContainer.style.width = "100%";

  tabsContainer.innerHTML = `
    <button data-type="movie" class="active">Фильмы</button>
    <button data-type="tv">Сериалы</button>
    <button data-type="person">Персоны</button>
    <div class="tab-underline" style="
      position:absolute;
      bottom:0;
      left:0;
      height:2px;
      background:#e7ff1e;
      transition: all 0.3s ease;"></div>
  `;

  searchContent.appendChild(tabsContainer);

  const resultsContainer = document.createElement("div");
  resultsContainer.style.display = "flex";
  resultsContainer.style.flexDirection = "column";
  resultsContainer.style.gap = "8px";
  resultsContainer.style.maxHeight = "400px";
  resultsContainer.style.overflowY = "auto";
  resultsContainer.style.width = "100%";
  searchContent.appendChild(resultsContainer);

  searchBtn.onclick = () => {
    modal.classList.add("active");
    input.value = "";
    resultsContainer.innerHTML = "";
    input.focus();
    updateUnderline();
  };

  closeModal.onclick = () => {
    modal.classList.remove("active");
  };

  let timer;
  let activeType = "movie";
  const tabButtons = tabsContainer.querySelectorAll("button");
  const underline = tabsContainer.querySelector(".tab-underline");

  function updateUnderline() {
    const activeBtn = tabsContainer.querySelector(".active");
    underline.style.width = activeBtn.offsetWidth + "px";
    underline.style.left = activeBtn.offsetLeft + "px";
  }

  tabButtons.forEach(btn => {
    btn.onclick = () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeType = btn.dataset.type;
      updateUnderline();
      if (input.value.trim()) {
        doSearch(input.value.trim());
      }
    };
  });

  window.addEventListener("resize", updateUnderline);
  updateUnderline();

  input.onkeyup = (e) => {
    const query = input.value.trim();
    if (!query) {
      resultsContainer.innerHTML = "";
      return;
    }
    if (e.key === "Enter") {
      doSearch(query);
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      doSearch(query);
    }, 500);
  };

  async function doSearch(query) {
    resultsContainer.innerHTML = "<p style='color:white'>Загрузка...</p>";
    try {
      const res = await api.get(`/search/${activeType}`, { params: { query } });
      renderResults(res.data.results);
    } catch (err) {
      console.error(err);
      resultsContainer.innerHTML = "<p style='color:white'>Ошибка при поиске</p>";
    }
  }

  function renderResults(results) {
    resultsContainer.innerHTML = "";
    if (!results || results.length === 0) {
      resultsContainer.innerHTML = "<p style='color:white'>Ничего не найдено.</p>";
      return;
    }

    results.forEach(r => {
      const div = document.createElement("div");
      div.className = "result-item";


      div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w92${r.poster_path || r.profile_path}" alt="">
      <div>
        <strong>${r.title || r.name}</strong>
        <p>${r.release_date || r.first_air_date || ""}</p>
      </div>
      ${r.vote_average ? `<span>${r.vote_average.toFixed(1)}</span>` : ""}
    `;    
      resultsContainer.appendChild(div);
    });
  }
}
