import { api } from "../../utils/api";
import { header } from "../../components/header.js";
import { footer } from "../../components/footer.js";

const app = document.querySelector("#app5");
app.prepend(header());
document.body.append(footer());

const movieId = new URLSearchParams(location.search).get("id");

api.get(`/movie/${movieId}`, {
  params: {
    append_to_response: "credits,videos,images"
  }
})
.then(response => {
  const movie = response.data;

  document.title = movie.title;
  document.querySelector(".poster img").src = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : "/public/placeholder.jpg";

  document.querySelector(".info h1").textContent = movie.title;
  document.querySelector(".info h2").textContent = movie.original_title;
  document.querySelector(".desc").textContent = movie.overview;

  const ratingEls = document.querySelectorAll(".rating .value");
  ratingEls.forEach(el => el.textContent = movie.vote_average?.toFixed(1) || "-");

  document.querySelector(".meta-left").innerHTML = `
    <p><b>Год:</b> <span class="greens">${movie.release_date?.slice(0,4) || "-"}</span></p>
    <p><b>Страна:</b> <span class="greens">${movie.production_countries.map(c => c.name).join(", ") || "-"}</span></p>
    <p><b>Слоган:</b> <span class="greens">${movie.tagline || "-"}</span></p>
    <p><b>Жанр:</b> <span class="greens">${movie.genres.map(g => g.name).join(", ") || "-"}</span></p>
    <p><b>Бюджет:</b> <span class="greens">$${movie.budget?.toLocaleString() || "—"}</span></p>
    <p><b>Сборы:</b> <span class="greens">$${movie.revenue?.toLocaleString() || "—"}</span></p>
    <p><b>Время:</b> <span class="greens">${movie.runtime ? movie.runtime + " мин." : "-"}</span></p>
    <p><b>Возраст:</b> <span class="greens">${movie.adult ? "18+" : "16+"}</span></p>
  `;
  document.querySelector(".meta-right").innerHTML = `
  <p><b>Производители:</b> <span class="greens">${movie.production_companies.length ? movie.production_companies.map(c => c.name).join(", ") : "-"}</span></p>
  <p><b>Премьера (мир):</b> <span class="greens">${movie.release_date ? new Date(movie.release_date).toLocaleDateString("ru-RU") : "-"}</span></p>
  <p><b>Жанр:</b> <span class="greens">${movie.genres.length ? movie.genres.map(g => g.name).join(", ") : "-"}</span></p>
  <p><b>Слоган:</b> <span class="greens">${movie.tagline || "-"}</span></p>
  <p><b>Бюджет:</b> <span class="greens">$${movie.budget?.toLocaleString() || "—"}</span></p>
  <p><b>Сборы:</b> <span class="greens">$${movie.revenue?.toLocaleString() || "—"}</span></p>
  <p><b>Возраст:</b> <span class="greens">${movie.adult ? "18+" : "16+"}</span></p>
  <p><b>Время:</b> <span class="greens">${movie.runtime ? movie.runtime + " мин." : "-"}</span></p>
`;


  const actors = movie.credits.cast.slice(0, 10);
  document.querySelector(".actors").innerHTML = actors.map(actor => `
    <div>
      <img src="${actor.profile_path 
        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
        : '/public/placeholder.jpg'}" alt="${actor.name}">
      <p>${actor.name}</p>
    </div>
  `).join("");

  const posters = movie.images.posters.slice(0, 6);
  const framesContainer = document.querySelector(".frames");
  if (posters.length) {
    framesContainer.innerHTML = posters.map(img => `
      <img src="https://image.tmdb.org/t/p/w500${img.file_path}" alt="">
    `).join("");
  } else {
    framesContainer.innerHTML = `
      <div style="width:100%;height:200px;background:#333;display:flex;align-items:center;justify-content:center;color:#aaa">
        Нет постеров
      </div>`;
  }
  
  const trailer = movie.videos.results.find(v => v.type === "Trailer" && v.site === "YouTube");
  const trailerContainer = document.querySelector(".trailer");
  
  if (trailer) {
    trailerContainer.innerHTML = `
      <iframe
        width="100%"
        height="640"
        src="https://www.youtube.com/embed/${trailer.key}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    `;
  } else {
    trailerContainer.innerHTML = `
      <div style="width:100%;height:200px;background:#333;display:flex;align-items:center;justify-content:center;color:#aaa">
        Нет трейлера
      </div>
    `;
  }
   

  api.get(`/movie/${movieId}/similar`)
    .then(similarRes => {
      const similarMovies = similarRes.data.results.slice(0, 8);
      const similarContainer = document.querySelector(".similar");
      if (similarMovies.length) {
        similarContainer.innerHTML = similarMovies.map(m => `
          <div class="similar-card" onclick="window.location.href='/src/pages/movie/index.html?id=${m.id}'">
            <img src="${m.poster_path
              ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
              : '/public/placeholder.jpg'}" alt="${m.title}">
            <p>${m.title}</p>
          </div>
        `).join("");
      } else {
        similarContainer.innerHTML = `<p style="color:#aaa">Нет похожих фильмов.</p>`;
      }
    })
    .catch(err => {
      console.error("Ошибка загрузки похожих фильмов:", err);
    });

})
.catch(error => {
  console.error("Ошибка загрузки фильма:", error);
});

