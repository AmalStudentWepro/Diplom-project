import axios from "axios";

const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjQ4YzUyYzFiMTkwMzgwZWRjMzg5Mzc4YjM3MjUzOSIsIm5iZiI6MTc1MDg0NTY5Ny4yODQ5OTk4LCJzdWIiOiI2ODViYzkwMWMyOTgxOGFjNmY4MTQ3ZmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xqiTlgiTWIYgPFQQ8hEOgt4ODX8sayApXw2JpSf6uN4";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    params: {
        language: "ru-RU"
    }
})

