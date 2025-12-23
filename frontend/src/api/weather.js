import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getWeather = (city) => API.get(`/weather?city=${city}`);

export const getCitySuggestions = (query) => API.get(`/cities?query=${query}`);
