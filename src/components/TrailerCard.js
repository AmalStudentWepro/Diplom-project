import { api } from "../utils/api";


let fallbackVideos = [
  "https://www.youtube.com/embed/tTQIF3VwIwI",
  "https://www.youtube.com/embed/mc93fO8ub8M?si=An5u8CcqQEl5OOSc",
  "https://www.youtube.com/embed/UUsgZEySv5k?si=Lfxpii-5LvdMFdXe",
  "https://www.youtube.com/embed/5PSNL1qE6VY",
  "https://www.youtube.com/embed/PMeHdc25BGE?si=TtAqh1jaetHKHEFe"
];


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
    const iframe = document.querySelector(".trailer");
  
    api.get(`/movie/${item.id}/videos`)
      .then(res => {
        const videos = res.data.results || [];
  
        let found = videos.find(v => v.type.toLowerCase() === "trailer");
        if (!found) {
          found = videos.find(v => v.type.toLowerCase() === "teaser");
        }
        if (!found && videos.length > 0) {
          found = videos[0];
        }
  
        if (found && found.site.toLowerCase() === "youtube" && found.key) {
          iframe.src = `https://www.youtube.com/embed/${found.key}`;
          
        } else {
          const randomUrl = fallbackVideos[Math.floor(Math.random() * fallbackVideos.length)];
          iframe.src = randomUrl;
        }
      })
      .catch(error => {
        console.error(error);
        const randomUrl = fallbackVideos[Math.floor(Math.random() * fallbackVideos.length)];
        iframe.src = randomUrl;
      });
  };
    
    return div;
}