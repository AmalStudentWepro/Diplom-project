import { render } from "../../utils/render";
import { header } from "../../components/header";
import { api } from "../../utils/api";
import { footer } from "../../components/footer";
import { Card } from "../../components/Card";
import { TrailerCard } from "../../components/TrailerCard";
import { Genre } from "../../components/genre";
import { initSearch } from "../../components/search";
import { loadPopularPersons } from '../../components/person';

document.body.prepend(header());
document.body.append(footer());
document.addEventListener("DOMContentLoaded", () => {
  initSearch();
});
loadPopularPersons();

const movie = document.querySelector(".now_playing");
const popularGrid = document.querySelector(".popular-films .movies-grid");
const upcomingGrid = document.querySelector(".coming-soon .movies-grid");
const genreBox = document.querySelector(".filters-nav");
const trailersBox = document.querySelector(".trailers-grid");

let promise1 = api.get("/movie/now_playing");
let promise2 = api.get("/movie/popular");
let promise3 = api.get("/movie/upcoming");
let promise4 = api.get("/genre/movie/list");

Promise.all([promise1, promise2, promise3, promise4])
  .then(([nowPlaying, popular, upcoming, genre]) => {
    render(nowPlaying.data.results.slice(0, 8), movie, Card);
    render(popular.data.results.slice(0, 4), popularGrid, Card);
    render(upcoming.data.results.slice(0, 4), upcomingGrid, Card);
    render(upcoming.data.results.slice(0, 12), trailersBox, TrailerCard);
    render(genre.data.genres.slice(0, 6), genreBox, Genre);

    const firstMovie = upcoming.data.results[0];

    if (firstMovie) {
      api.get(`/movie/${firstMovie.id}/videos`)
        .then(res => {
          const videos = res.data.results;

          if (!videos || videos.length === 0) {
            console.warn("Вообще нет видео");
            return;
          }

          let found = videos.find(v => v.type.toLowerCase() === "trailer");
          if (!found) {
            found = videos.find(v => v.type.toLowerCase() === "teaser");
          }
          if (!found && videos.length > 0) {
            found = videos[0];
          }

          if (found && found.site.toLowerCase() === "youtube" && found.key) {
            const iframe = document.querySelector(".trailer");
            iframe.src = `https://www.youtube.com/embed/${found.key}`;
          } else {
            console.warn("Видео не найдено");
          }
        })
        .catch(err => console.error(err));
    }
  })
  .catch(error => console.error(error));

document.querySelector(".search-btn").onclick = () => {
  document.querySelector(".search-modal").classList.add("active");
};
document.querySelector(".close-modal").onclick = () => {
  document.querySelector(".search-modal").classList.remove("active");
};
