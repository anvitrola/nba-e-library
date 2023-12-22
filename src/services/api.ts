import axios from "axios";

export const HttpClient = axios.create({
    baseURL: 'https://free-nba.p.rapidapi.com',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
        'X-RapidAPI-Key': 'f50a47a7ddmsh482e257a603d514p106077jsn56e5e9623fd3'
    }
})