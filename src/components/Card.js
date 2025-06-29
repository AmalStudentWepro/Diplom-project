export function Card(movie) {
  const div = document.createElement("div");
  div.className = "movie-card";
  div.innerHTML = `
    <span class="rating">${movie.vote_average.toFixed(2)}</span>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p class="genres">${movie.release_date}</p>
  `;
  return div;
}