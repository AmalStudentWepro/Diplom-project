import { header } from "../../components/header.js";
import { footer } from "../../components/footer.js";
import { api } from "../../utils/api.js";

document.body.prepend(header());
document.body.append(footer());

const params = new URLSearchParams(window.location.search);
const personId = params.get("id");

if (!personId) {
  console.error("Нет ID актёра в URL");
} else {
  api.get(`/person/${personId}`, {
    params: { language: "ru-RU" }
  })
  .then(async (response) => {
    const person = response.data;

    document.querySelectorAll(".actor-name").forEach(el => el.textContent = person.name);
    document.querySelector(".actor-original").textContent = person.also_known_as?.[0] || "";
    document.querySelector(".actor-bio").textContent = person.biography || "Биография отсутствует";
    document.querySelector(".actor-birthday").textContent = person.birthday || "—";
    document.querySelector(".actor-place").textContent = person.place_of_birth || "—";
    document.querySelector(".actor-popularity").textContent = Math.round(person.popularity);
    document.querySelector(".actor-photo").src = person.profile_path
      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
      : "/public/placeholder.jpg";

    const { data: credits } = await api.get(`/person/${personId}/movie_credits`, {
      params: { language: "ru-RU" }
    });

    const bestMovies = credits.cast
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, 4);

    const movieCards = document.querySelector(".movie-cards");
    movieCards.innerHTML = ""; 

    bestMovies.forEach(movie => {
      const div = document.createElement("div");
      div.className = "movie-card";
      div.innerHTML = `
        <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "/public/placeholder.jpg"}" alt="${movie.title}">
        <div class="movie-rating">${movie.vote_average?.toFixed(1) || "-"}</div>
        <p class="movie-title">${movie.title}</p>
        <p class="movie-meta">${movie.release_date ? movie.release_date.slice(0, 4) : "—"}</p>
      `;
      movieCards.appendChild(div);
    });

    const { data: images } = await api.get(`/person/${personId}/images`);

    const photos = images.profiles.slice(0, 5);
    const photoGrid = document.querySelector(".photo-grid");
    photoGrid.innerHTML = ""; 

    photos.forEach(photo => {
      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w500${photo.file_path}`;
      photoGrid.appendChild(img);
    });

    if (images.profiles.length > 5) {
      const overlay = document.createElement("div");
      overlay.className = "photo-overlay";
      overlay.textContent = `+${images.profiles.length - 5}`;
      photoGrid.appendChild(overlay);
    }
  })
  .catch(err => {
    console.error("Ошибка загрузки актёра:", err);
  });
}
