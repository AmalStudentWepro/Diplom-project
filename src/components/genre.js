import { api } from "../utils/api";
import { render } from "../utils/render";
import { Card } from "./Card";

export function Genre(item){
    let div = document.createElement("div");

    div.textContent = item.name;

    const movie = document.querySelector(".now_playing");

    div.onclick = () => {
        console.log(item)
        api.get(`/discover/movie?with_genres=${item.id}`)
        .then((res) => {
            render(res.data.results.slice(0, 8), movie, Card);
        })
    }

    return div;
}
