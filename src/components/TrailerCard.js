import { api } from "../utils/api";

export function TrailerCard(item) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const p = document.createElement("p");

  div.className = "trailer-card";

  img.src = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
  img.alt = item.title;

  p.textContent = item.title;

  div.append(img, p);

  div.onclick = () => {
    let iframe = document.querySelector(".trailer");
  
    api.get(`/movie/${item.id}/videos`)
      .then(res => {
        const videos = res.data.results;
  
        let found = videos.find(
          (video) => video.type.toLowerCase() === "trailer"
        );
  
        if (!found) {
          found = videos.find(
            (video) => video.type.toLowerCase() === "teaser"
          );
        }
        if (!found && videos.length > 0) {
          found = videos[0];
        }
        if (found) {
          iframe.src = `https://www.youtube.com/embed/${found.key}`;
        } else {
          alert("Видео не найдено :(");
        }
      })
      .catch(err => {
        console.error("Ошибка при получении видео:", err);
        alert("Не удалось загрузить видео.");
      });
  };
  

  return div;
}
