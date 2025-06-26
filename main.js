import { api } from "./src/utils/api";

api.get("/movie/popular")
    .then((res) => console.log(res))

    // arr place component