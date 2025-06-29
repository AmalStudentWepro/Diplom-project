import { render } from "../../utils/render"; 
import { header } from "../../components/header";
import { api } from "../../utils/api";
import { footer } from "../../components/footer";
import { Card } from "../../components/Card";
import { TrailerCard } from "../../components/TrailerCard";

document.body.prepend(header());
document.body.append(footer());

const movie = document.querySelector(".now_playing");
const popularGrid = document.querySelector(".popular-films .movies-grid");
const upcomingGrid = document.querySelector(".coming-soon .movies-grid");
const trailersBox = document.querySelector(".trailers-grid");

let promise1 = api.get("/movie/now_playing");
let promise2 = api.get("/movie/popular");
let promise3 = api.get("/movie/upcoming");

Promise.all([promise1, promise2, promise3])
  .then(([nowPlaying, popular, upcoming]) => {
    render(nowPlaying.data.results.slice(0, 8), movie, Card);
    render(popular.data.results.slice(0, 4), popularGrid, Card);
    render(upcoming.data.results.slice(0, 4), upcomingGrid, Card);
    render(popular.data.results.slice(0, 12), trailersBox, TrailerCard);

    const firstMovie = upcoming.data.results[0];

    if (firstMovie) {
      api.get(`/movie/${firstMovie.id}/videos`)
        .then(res => {
          const videos = res.data.results;

          let found = videos.find(v => v.type.toLowerCase() === "trailer");
          if (!found) {
            found = videos.find(v => v.type.toLowerCase() === "teaser");
          }
          if (!found && videos.length > 0) {
            found = videos[0];
          }

          if (found) {
            const iframe = document.querySelector(".trailer");
            iframe.src = `https://www.youtube.com/embed/${found.key}`;
          } else {
            console.warn("Видео не найдено для первого фильма.");
          }
        })
        .catch(err => console.error("Ошибка при получении видео:", err));
    }
  })
  .catch(error => console.error(error));
