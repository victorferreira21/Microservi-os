import axios from "axios";

const api = axios.create({
  baseURL: "https://45f7b95f91fa.ngrok-free.app/api/v1",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("vet_auth_token") ||
    sessionStorage.getItem("vet_auth_token");

  if (token) {
    config.headers.Authorization = token; // só o token puro
    console.log("🔐 Enviando token:", token);
  }

  return config;
});

export default api;
