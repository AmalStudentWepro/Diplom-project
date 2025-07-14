export function Card(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.dataset.id = movie.id; 

  const img = document.createElement("img");
  img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  img.alt = movie.title;
  card.appendChild(img);

  const title = document.createElement("h3");
  title.textContent = movie.title;
  card.appendChild(title);

  const rating = document.createElement("div");
  rating.className = "movie-rating";
  rating.textContent = movie.vote_average?.toFixed(1) || "-";
  card.appendChild(rating);

  card.onmouseenter = () => {
    const bg = document.querySelector(".dynamic-bg");
    if (movie.backdrop_path) {
      bg.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;
    } else {
      bg.style.backgroundImage = `url('/public/fallback.jpg')`;
    }
  };

  card.onclick = () => {
    window.location.href = `/src/pages/movie/index.html?id=${movie.id}`;
  };

  return card;
}
